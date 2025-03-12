#!/usr/bin/env python3
"""
Before Example - Prompt Prone to Hallucinations

This script demonstrates a prompt that's prone to hallucinations and factual errors,
which typically results in lower correctness scores.
"""

import os
import sys
from dotenv import load_dotenv
from galileo import openai

# Add the parent directory to the path so we can import the utils package
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../../../')))

# Load environment variables from .env file
load_dotenv()

def run_original_prompt(client):
    """Run the original prompt that's prone to hallucinations"""
    prompt = "Which are better: Sharks or Tigers? Explain why. Answer succinctly, you must choose one."
    
    # Make API call with Galileo tracking
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "system", "content": prompt}],
    )
    
    # Return the response content
    return response.choices[0].message.content.strip()

def main():
    """Main function"""
    # Initialize Galileo client for OpenAI
    openai_api_key = os.environ.get("OPENAI_API_KEY")
    client = openai.OpenAI(api_key=openai_api_key)
    
    # Run the original prompt
    response = run_original_prompt(client)
    
    # Print the response
    print("\nModel Response:")
    print(response)

if __name__ == "__main__":
    main() 