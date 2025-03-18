#!/usr/bin/env python3
"""
After Example - Improved Prompt with Specific Constraints

This script demonstrates an improved prompt with specific, measurable constraints,
which typically results in higher instruction adherence metrics.
"""

import os
import sys

from dotenv import load_dotenv
from galileo.openai import openai

# Add the parent directory to the path so we can import the utils package
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../../..")))

# Load environment variables from .env file
load_dotenv()


def run_improved_prompt(client):
    """Run the improved prompt with specific constraints"""
    prompt = "Explain Newton's First Law in exactly 15 words or less."

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

    # Check word count
    word_count = len(response.split())
    print(f"\nWord count: {word_count}")

    if word_count <= 15:
        print(f"✓ Response contains {word_count} words (within the 15-word limit)")
    else:
        print(f"⚠ Response contains {word_count} words (exceeds the 15-word limit)")


if __name__ == "__main__":
    main()
