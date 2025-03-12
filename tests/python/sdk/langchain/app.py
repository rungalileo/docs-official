#!/usr/bin/env python3
"""
LangChain Integration Example

This script demonstrates how to use LangChain with Galileo for tracing and monitoring.
"""

import os
from dotenv import load_dotenv
from galileo.handlers.langchain import GalileoCallback
from langchain_openai import ChatOpenAI
from langchain.schema import HumanMessage

# Load environment variables
load_dotenv()

def run_langchain_example():
    """Run a simple LangChain example with Galileo integration"""
    # Create a callback handler for Galileo
    callback = GalileoCallback()
    
    # Initialize the LLM with the callback
    llm = ChatOpenAI(
        model="gpt-3.5-turbo", 
        temperature=0.7, 
        callbacks=[callback],
        openai_api_key=os.environ.get("OPENAI_API_KEY")
    )
    
    # Create a message with the user's query
    messages = [HumanMessage(content="What is LangChain and how is it used with OpenAI?")]
    
    # Make the API call
    response = llm.invoke(messages)
    
    # Return the response content
    return response.content

if __name__ == "__main__":
    # Run the example and print the response
    response = run_langchain_example()
    print("\nLangChain Response:")
    print(response)
