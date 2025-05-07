# Fixing Hallucinations Testbed

This directory contains example scripts that demonstrate how to identify and address hallucinations and factual errors in AI models using Galileo.

## Overview

The examples show:

1. A prompt that's prone to hallucinations (`before.py`)
2. An improved prompt with specific instructions to reduce hallucinations (`after.py`)
3. A testbed script that compares both approaches and shows the improvement in metrics (`fixing-hallucinations-testbed.py`)

## Prerequisites

- Python 3.8+
- Galileo SDK
- OpenAI API key
- A Galileo project named "fixing-hallucinations" with a log stream named "dev"
- The "correctness" and "uncertainty" metrics enabled for your project

## Setup

1. Create a `.env` file in the root directory with the following variables:

```
GALILEO_CONSOLE_URL="https://api.galileo.ai"
GALILEO_PROJECT="fixing-hallucinations"
GALILEO_LOG_STREAM="dev"
GALILEO_API_KEY="your-galileo-api-key"
OPENAI_API_KEY="your-openai-api-key"
```

2. Install the required dependencies:

```bash
pip install galileo openai python-dotenv rich
```

## Running the Examples

### Individual Examples

To run the individual examples:

```bash
# Run the original prompt (prone to hallucinations)
python before.py

# Run the improved prompt (reduced hallucinations)
python after.py
```

### Testbed

To run the full testbed that compares both approaches:

```bash
python fixing-hallucinations-testbed.py
```

The testbed will:

1. Run the original prompt and collect metrics
2. Run the improved prompt and collect metrics
3. Compare the results, showing the improvement in correctness and uncertainty metrics

## Understanding the Results

The testbed compares two key metrics:

- **Correctness**: Measures how factually accurate the response is
- **Uncertainty**: Measures how appropriately the model expresses uncertainty when dealing with subjective questions

The improved prompt should show higher correctness scores and more appropriate uncertainty expression compared to the original prompt.

## Key Improvements

The improved prompt includes several key elements to reduce hallucinations:

1. Acknowledges that the question is subjective without a factually correct answer
2. Instructs the model to only provide scientifically verified facts
3. Requires clear distinction between facts and opinions
4. Explicitly states when a subjective opinion is given
5. Maintains succinctness in the response

These improvements help prevent the model from presenting subjective opinions as factual statements, which is a common cause of hallucinations and factual errors.
