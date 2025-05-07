# Galileo Quickstart Examples

This directory contains examples demonstrating how to use Galileo to track and evaluate prompts, with a focus on improving instruction adherence metrics.

## Files

- `before.py`: A simple example using a basic prompt without specific constraints
- `after.py`: An improved example using a prompt with clear, measurable constraints
- `quickstart_testbed.py`: A comprehensive testbed that runs both examples and compares their metrics

## Prerequisites

Before running these examples, you'll need:

1. A Galileo account with API access
2. An OpenAI API key
3. Python 3.7 or higher
4. Required Python packages (install with `pip install -r requirements.txt`)

## Setup

1. Create a `.env` file in the root directory with the following variables:

```
GALILEO_CONSOLE_URL="https://api.galileo.ai"
GALILEO_PROJECT="your-project-name"
GALILEO_LOG_STREAM="your-log-stream-name"
GALILEO_API_KEY="your-galileo-api-key"
OPENAI_API_KEY="your-openai-api-key"
```

2. Install the required packages:

```bash
pip install -r requirements.txt
```

## Running the Examples

### Individual Examples

You can run each example individually:

```bash
# Run the "before" example
python before.py

# Run the "after" example
python after.py
```

### Testbed

For a comprehensive comparison, run the testbed:

```bash
python quickstart_testbed.py
```

The testbed will:

1. Run both the original and improved prompts
2. Wait for metrics to be available (up to 2 minutes)
3. Display the metrics for each prompt
4. Compare the instruction adherence scores
5. Show a visual representation of the improvement

## Understanding the Results

The key metric to observe is `instruction_adherence`, which measures how well the model follows the instructions in the prompt. The improved prompt typically achieves a higher score because it provides clear, measurable constraints that the model can follow.

## Example Prompts

1. **Original Prompt** (before.py):

   ```
   Explain the following topic succinctly: Newton's First Law
   ```

2. **Improved Prompt** (after.py):
   ```
   Explain Newton's First Law in exactly 15 words or less.
   ```

The improved prompt adds a specific, measurable constraint (15 words or less) that makes it clear what "succinctly" means, resulting in better instruction adherence.

## Troubleshooting

- If metrics aren't appearing, ensure that metrics are enabled for your project in the Galileo console
- If authentication fails, verify your API keys and ensure they have the necessary permissions
- If you encounter any other issues, check the Galileo documentation or contact support
