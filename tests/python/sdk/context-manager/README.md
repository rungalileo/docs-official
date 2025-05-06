# Galileo Context Manager Integration

This directory contains examples and tests for using the Galileo context manager for tracing OpenAI API calls.

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
   pip install galileo openai python-dotenv rich
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

- `app.py`: A simple example of using the Galileo context manager with OpenAI
- `test.py`: A test script that runs app.py and verifies that traces are created in Galileo

## Usage

### Running the Example

To run the context manager example:

```bash
python app.py
```

This will execute a simple OpenAI API call within a Galileo context manager, which will trace the call.

### Testing the Integration

To test that the integration is working correctly:

```bash
python test.py
```

This script will:
1. Run the app.py example
2. Check for new traces in your Galileo project
3. Verify that the traces contain spans related to OpenAI API calls
4. Report whether the integration is working correctly

## How It Works

The integration works by using the `galileo_context` context manager to wrap OpenAI API calls:

```python
from galileo import galileo_context, openai

# Initialize the Galileo wrapped OpenAI client
client = openai.OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

# This will log to the specified project and log stream
with galileo_context(project="my-project", log_stream="my-log-stream"):
    chat_completion = client.chat.completions.create(
        messages=[{"role": "user", "content": "Your prompt here"}], 
        model="gpt-4o"
    )
```

The context manager ensures that all OpenAI API calls made within its scope are traced in Galileo.

## Troubleshooting

If you encounter issues:

1. Ensure your API keys are correct in the `.env` file
2. Check that you have the correct project and log stream names
3. Verify that you have installed all required dependencies
4. Check the Galileo console to see if traces are being created

For more information, visit the [Galileo documentation](https://docs.galileo.io). 