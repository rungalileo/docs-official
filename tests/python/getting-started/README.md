# Galileo Trace Lister

This script lists all traces in a specified log stream for a Galileo project.

## Prerequisites

- Python 3.7 or higher
- Galileo API key
- Galileo project and log stream

## Installation

1. Clone this repository or download the script files.

2. Install the required dependencies:

```bash
pip install -r requirements.txt
```

3. Create a `.env` file in the same directory as the script with the following content:

```
GALILEO_CONSOLE_URL="https://api.galileo.ai"
GALILEO_PROJECT="your-project-name"
GALILEO_LOG_STREAM="your-log-stream-name"
GALILEO_API_KEY="your-galileo-api-key"
```

Replace the placeholder values with your actual Galileo project name, log stream name, and API key.

## Usage

Run the script with:

```bash
./browser.py
```

or

```bash
python browser.py
```

The script will:

1. Check if all required environment variables are set
2. Get the project ID and log stream ID from their names
3. Fetch traces from the specified log stream
4. Display the traces in a table with their IDs, creation times, and snippets of their inputs and outputs

## Customization

You can modify the script to change:

- The maximum number of traces to fetch (change the `MAX_TRACES` constant)
- The display format of the traces (modify the `display_traces` function)
- The sorting order of the traces (modify the `params` dictionary in the `get_traces` function)

## Troubleshooting

If you encounter any issues:

- Make sure your `.env` file is correctly set up with valid credentials
- Check that your Galileo project and log stream names are correct
- Verify that your Galileo API key is valid and has the necessary permissions
- Check your internet connection

If you see an "Unexpected response format" error, the Galileo API might have changed. Please check the latest API documentation. 