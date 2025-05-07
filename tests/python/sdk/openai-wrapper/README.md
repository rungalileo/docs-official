# Galileo OpenAI Wrapper Test

This directory contains example scripts that demonstrate how to use and test the Galileo OpenAI wrapper.

## Overview

The examples show:

1. A simple application that uses the Galileo OpenAI wrapper (`app.py`)
2. A test script that verifies traces were created for the application (`test.py`)

## Prerequisites

- Python 3.8+
- Galileo SDK
- OpenAI API key
- A Galileo project and log stream

## Setup

1. Create a `.env` file in this directory with the following variables:

```
GALILEO_CONSOLE_URL="https://api.galileo.ai"
GALILEO_PROJECT="your-project-name"
GALILEO_LOG_STREAM="your-log-stream-name"
GALILEO_API_KEY="your-galileo-api-key"
OPENAI_API_KEY="your-openai-api-key"
```

2. Install the required dependencies:

```bash
pip install galileo openai python-dotenv rich
```

## Running the Examples

### Application

To run the application:

```bash
python app.py
```

This will make a simple OpenAI API call using the Galileo wrapper, which will automatically create a trace in the Galileo platform.

### Test

To run the test script:

```bash
python test.py
```

The test script will:

1. Run the application
2. Check for new traces in the Galileo platform
3. Verify that the traces contain spans for the OpenAI API call
4. Display information about the spans

## Understanding the Results

The test script will display a success message if it finds new traces with spans after running the application. If no new traces are found, it will display a failure message.

## Key Components

The Galileo OpenAI wrapper provides several key features:

1. **Automatic Tracing**: All OpenAI API calls are automatically traced in the Galileo platform
2. **Span Creation**: Each API call creates a span with detailed information about the request and response
3. **Metrics Collection**: Metrics are automatically collected for each API call, such as latency and token usage

These features make it easy to monitor and analyze your OpenAI API usage without having to add any additional instrumentation code.
