import os
import sys
from typing import Annotated, Sequence

from dotenv import load_dotenv
from elasticsearch import Elasticsearch
from langchain.tools.retriever import create_retriever_tool
from langchain_community.chat_message_histories import ElasticsearchChatMessageHistory
from langchain_core.messages import BaseMessage, HumanMessage, AIMessageChunk
from langchain_core.documents import Document
from langchain_elasticsearch import ElasticsearchStore, SparseVectorStrategy
from langchain_openai import ChatOpenAI
from langgraph.graph import END, StateGraph, START
from langgraph.graph.message import add_messages
from langgraph.prebuilt import ToolNode, tools_condition
from typing_extensions import TypedDict

from galileo.handlers.langchain import GalileoCallback

# --- Setup and Configuration ---

# Load environment variables from your .env file
load_dotenv()

# Elasticsearch Configuration
ES_CLOUD_ID = os.getenv("ES_CLOUD_ID")
ES_API_KEY = os.getenv("ES_API_KEY")
ES_INDEX = os.getenv("ES_INDEX", "workplace-app-docs")
ES_INDEX_CHAT_HISTORY = os.getenv(
    "ES_INDEX_CHAT_HISTORY", "workplace-app-docs-chat-history"
)
ELSER_MODEL = os.getenv("ELSER_MODEL", ".elser_model_2")

# OpenAI Configuration
# (Handled by langchain_openai library using OPENAI_API_KEY env var)

# Galileo Configuration
# (Handled by GalileoCallback reading env vars)

# --- Elasticsearch Client ---

# Initialize Elasticsearch client
try:
    if not ES_CLOUD_ID or not ES_API_KEY:
        raise ValueError(
            "ES_CLOUD_ID and ES_API_KEY environment variables must be set."
        )
    elasticsearch_client = Elasticsearch(cloud_id=ES_CLOUD_ID, api_key=ES_API_KEY)
    elasticsearch_client.info()  # Check connection
except Exception as e:
    print(f"Error connecting to Elasticsearch: {e}")
    sys.exit(1)


def get_elasticsearch_chat_message_history(index_name: str, session_id: str):
    """Get chat message history for a session."""
    return ElasticsearchChatMessageHistory(
        es_connection=elasticsearch_client, index=index_name, session_id=session_id
    )


# --- Galileo Logging ---

# The GalileoCallback handler automatically reads API key, project name,
# and stream name from your environment variables.
# Ensure GALILEO_API_KEY, GALILEO_PROJECT, and GALILEO_LOG_STREAM are set.
galileo_handler = GalileoCallback()


# --- Document Management ---

# Sample documents
sample_docs = [
    Document(
        page_content="Our company offers comprehensive health insurance including medical, dental, and vision coverage. Employees can choose from three different plans with varying deductibles and coverage levels.",
        metadata={"source": "employee_handbook", "section": "benefits", "page": 1},
    ),
    Document(
        page_content="Remote work policy allows employees to work from home up to 3 days per week. All remote work must be approved by your direct manager and requires a dedicated workspace.",
        metadata={"source": "employee_handbook", "section": "policies", "page": 15},
    ),
    Document(
        page_content="Annual performance reviews are conducted in Q4 of each year. Employees should prepare a self-assessment and gather feedback from colleagues and clients.",
        metadata={"source": "hr_processes", "section": "performance", "page": 3},
    ),
    Document(
        page_content="The company's vacation policy provides 15 days of paid time off for new employees, increasing to 20 days after 3 years of service.",
        metadata={"source": "employee_handbook", "section": "time_off", "page": 8},
    ),
]


def add_sample_documents():
    """Add sample documents to Elasticsearch."""
    print(f"Adding sample documents to Elasticsearch index '{ES_INDEX}'...")

    # Initialize store
    store = ElasticsearchStore(
        es_connection=elasticsearch_client,
        index_name=ES_INDEX,
        strategy=SparseVectorStrategy(model_id=ELSER_MODEL),
    )

    # Add documents
    store.add_documents(sample_docs)
    print(f"Added {len(sample_docs)} documents.")


# --- RAG Agent Definition ---


# 1. Define agent state
class AgentState(TypedDict):
    messages: Annotated[Sequence[BaseMessage], add_messages]


# 2. Set up the retriever tool
store = ElasticsearchStore(
    es_connection=elasticsearch_client,
    index_name=ES_INDEX,
    strategy=SparseVectorStrategy(model_id=ELSER_MODEL),
)
retriever = store.as_retriever()

retriever_tool = create_retriever_tool(
    retriever,
    "retrieve_workplace_documents",
    "Search and return information about company policies, benefits, and processes.",
)
tools = [retriever_tool]

# 3. Define the agent
# Use a model that is good at tool use and supports streaming
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0, streaming=True)
agent_runnable = llm.bind_tools(tools)


def run_agent(state: AgentState):
    """
    Invokes the agent model to generate a response based on the current state.
    The agent decides whether to use a tool or respond directly.
    """
    print("--- CALLING AGENT ---")
    messages = state["messages"]
    response = agent_runnable.invoke(messages)
    return {"messages": [response]}


# 4. Define the graph
tool_node = ToolNode(tools)

workflow = StateGraph(AgentState)
workflow.add_node("agent", run_agent)
workflow.add_node("tools", tool_node)

workflow.add_edge(START, "agent")

workflow.add_conditional_edges(
    "agent",
    tools_condition,
    {
        "tools": "tools",
        END: END,
    },
)

workflow.add_edge("tools", "agent")

graph = workflow.compile()
print("LangGraph agent compiled.")


# --- Interaction Functions ---


def ask_question(question: str, session_id: str = "default"):
    """Ask a question and get a complete answer from the agent."""
    chat_history = get_elasticsearch_chat_message_history(
        ES_INDEX_CHAT_HISTORY, session_id
    )

    messages = chat_history.messages
    messages.append(HumanMessage(content=question))

    inputs = {"messages": messages}

    # Invoke the agent with Galileo logging
    final_state = graph.invoke(
        inputs, config={"recursion_limit": 5, "callbacks": [galileo_handler]}
    )

    # The final AI response is the last message in the state
    response_message = final_state["messages"][-1]

    # Save the interaction to chat history
    chat_history.add_user_message(question)
    chat_history.add_ai_message(response_message.content)

    return response_message.content


def stream_agent_response(question: str, session_id: str = "default"):
    """Stream the agent's response for a real-time UI."""
    chat_history = get_elasticsearch_chat_message_history(
        ES_INDEX_CHAT_HISTORY, session_id
    )

    messages = chat_history.messages
    messages.append(HumanMessage(content=question))

    inputs = {"messages": messages}

    full_response = ""
    print("Bot: ", end="", flush=True)
    # The graph will stream AIMessageChunk objects from the agent node
    for chunk in graph.stream(
        inputs, config={"recursion_limit": 5, "callbacks": [galileo_handler]}
    ):
        if "agent" in chunk:
            agent_messages = chunk["agent"]["messages"]
            for msg in agent_messages:
                # msg can be a ToolCall or an AIMessageChunk
                if isinstance(msg, AIMessageChunk) and msg.content:
                    print(msg.content, end="", flush=True)
                    full_response += msg.content

    print()  # Newline after streaming

    # Save the full interaction to history after the stream is complete
    if full_response:
        chat_history.add_user_message(question)
        chat_history.add_ai_message(full_response)


# --- Main Application Runner ---


def main():
    if len(sys.argv) > 1 and sys.argv[1] == "add_docs":
        add_sample_documents()
        return

    print("Elasticsearch RAG Agent")
    print("Type 'quit' to exit.")
    print("Use streaming? (y/n) [default: n]: ", end="")
    use_stream = input().lower() == "y"
    print("\n")

    session_id = "demo-agent-session"

    while True:
        question = input("You: ")
        if question.lower() == "quit":
            break

        if use_stream:
            stream_agent_response(question, session_id)
            print()
        else:
            answer = ask_question(question, session_id)
            print(f"Bot: {answer}\n")


if __name__ == "__main__":
    main() 