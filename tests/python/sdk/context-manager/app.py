#!/usr/bin/env python3
"""
Galileo Context Manager Example

This script demonstrates how to use the Galileo context manager for tracing OpenAI API calls.
"""

import os
from dotenv import load_dotenv
from galileo import galileo_context, openai

# Load environment variables
load_dotenv()

def run_context_manager_example():
    """Run a simple example using Galileo's context manager"""
    # Initialize the Galileo wrapped OpenAI client
    client = openai.OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))
    
    # Get project and log stream from environment variables
    project = os.environ.get("GALILEO_PROJECT", "my-project")
    log_stream = os.environ.get("GALILEO_LOG_STREAM", "my-log-stream")
    
    # This will log to the specified project and log stream
    with galileo_context(project=project, log_stream=log_stream):
        chat_completion = client.chat.completions.create(
            messages=[{"role": "user", "content": "Explain what a context manager is in Python in one sentence."}], 
            model="gpt-4o"
        )
        
        # Return the response content
        return chat_completion.choices[0].message.content

if __name__ == "__main__":
    # Run the example and print the response
    response = run_context_manager_example()
    print("\nContext Manager Response:")
    print(response)