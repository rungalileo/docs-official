# Galileo LangChain Integration

This directory contains examples and tests for integrating LangChain with Galileo for tracing and monitoring.

## Prerequisites

- Python 3.8 or higher
- Galileo account with API key
- OpenAI API key

## Setup

1. Create a virtual environment (recommended):

   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

2. Install the required dependencies:

   ```bash
   pip install galileo openai langchain langchain-openai python-dotenv rich
   ```

3. Create a `.env` file in this directory with the following variables:

   ```
   GALILEO_CONSOLE_URL=https://console.galileo.io
   GALILEO_API_KEY=your_galileo_api_key
   GALILEO_PROJECT=your_project_name
   GALILEO_LOG_STREAM=your_log_stream_name
   OPENAI_API_KEY=your_openai_api_key
   ```

   You can copy the `.env.example` file and fill in your values:

   ```bash
   cp .env.example .env
   ```

## Files

- `app.py`: A simple example of using LangChain with Galileo
- `test.py`: A test script that runs app.py and verifies that traces are created in Galileo

## Usage

### Running the Example

To run the LangChain example:

```bash
python app.py
```

This will execute a simple LangChain example that uses the Galileo callback handler to trace the LLM call.

### Testing the Integration

To test that the integration is working correctly:

```bash
python test.py
```

This script will:

1. Run the app.py example
2. Check for new traces in your Galileo project
3. Verify that the traces contain spans related to LangChain
4. Report whether the integration is working correctly

## How It Works

The integration works by adding a `GalileoCallback` to the LangChain callbacks:

```python
from galileo.handlers.langchain import GalileoCallback
from langchain_openai import ChatOpenAI

# Create a callback handler
callback = GalileoCallback()

# Initialize the LLM with the callback
llm = ChatOpenAI(model="gpt-4o", callbacks=[callback])
```

When you make a call to the LLM, the callback will automatically create traces in Galileo:

```python
from langchain.schema import HumanMessage

# Create a message with the user's query
messages = [HumanMessage(content="Your prompt here")]

# Make the API call - this will be traced in Galileo
response = llm.invoke(messages)
```

## Troubleshooting

If you encounter issues:

1. Ensure your API keys are correct in the `.env` file
2. Check that you have the correct project and log stream names
3. Verify that you have installed all required dependencies
4. Check the Galileo console to see if traces are being created

For more information, visit the [Galileo documentation](https://docs.galileo.io).
