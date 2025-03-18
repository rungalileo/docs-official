#!/usr/bin/env python3
"""
After Example - Improved Prompt to Reduce Hallucinations

This script demonstrates an improved prompt with specific instructions to reduce hallucinations,
which typically results in higher correctness scores and appropriate uncertainty expression.
"""

import os
import sys

from dotenv import load_dotenv
from galileo.openai import openai

# Add the parent directory to the path so we can import the utils package
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../../../")))

# Load environment variables from .env file
load_dotenv()


def run_improved_prompt(client):
    """Run the improved prompt that reduces hallucinations"""
    prompt = """
    Which are better: Sharks or Tigers? 

    Important instructions:
    1. Acknowledge that this is a subjective question without a factually correct answer
    2. Only provide scientifically verified facts about both animals
    3. Clearly distinguish between facts and opinions
    4. If you must choose one as 'better', explicitly state that this is a subjective opinion
    5. Answer succinctly
    """

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

    # Run the improved prompt
    response = run_improved_prompt(client)

    # Print the response
    print("\nModel Response:")
    print(response)


if __name__ == "__main__":
    main()
