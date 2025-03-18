#!/usr/bin/env python3
"""
Galileo Quickstart Testbed

This script demonstrates the difference between a simple prompt and an improved prompt
with specific constraints, showing how instruction adherence metrics can be improved.
"""

import os
import sys
import time

from dotenv import load_dotenv
from galileo import galileo_context
from galileo.openai import openai
from rich.console import Console
from rich.panel import Panel

# Add the parent directory to the path so we can import the utils package
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../../..")))

# Import the example modules
from after import run_improved_prompt
from before import run_original_prompt

# Import utility modules
from tests.python.utils import config, display, galileo_api

# Initialize rich console
console = Console()

# Load environment variables from .env file
load_dotenv()


def run_test_with_metrics(
    client, run_function, description, api_url, headers, project_id, log_stream_id, max_wait_time=120
):
    """
    Run a test function and wait for metrics to be available

    Args:
        client: An initialized Galileo OpenAI client
        run_function: The function to run (from before.py or after.py)
        description: A description of the test
        api_url: The Galileo API URL
        headers: The API request headers
        project_id: The project ID
        log_stream_id: The log stream ID
        max_wait_time: Maximum time to wait for metrics in seconds (default: 120)

    Returns:
        A tuple of (response_content, metrics)
    """
    console.rule(f"[bold blue]{description}", style="blue")

    # Make API call with Galileo tracking
    console.print("\n[bold cyan]Making API call to OpenAI[/]")

    try:
        with console.status("[bold green]Sending request to OpenAI...", spinner="dots"):
            start_time = time.time()
            content = run_function(client)
            elapsed = time.time() - start_time

        console.print(f"[bold green]✓ API call completed in {elapsed:.2f} seconds[/]")
    except Exception as e:
        console.print(f"[bold red]✗ Error making API call: {str(e)}[/]")
        return None, None

    # Print the response
    console.print("\n[bold cyan]Model Response[/]")
    console.print(Panel(content, border_style="green", expand=False))

    # Flush the logger to ensure all logs are sent to Galileo
    console.print("[bold cyan]Flushing Galileo logger...[/]")
    try:
        galileo_context.flush()
        console.print("[bold green]✓ Galileo logger flushed successfully[/]")
    except Exception:
        console.print("[bold yellow]⚠ Continuing without flush. Metrics may be delayed.[/]")

    # Get the latest trace ID (should be the one we just created)
    trace_id = galileo_api.get_latest_trace(api_url, headers, project_id, log_stream_id)

    if not trace_id:
        console.print("[bold red]✗ Could not find the trace for this run[/]")
        return content, None

    console.print(f"[bold green]✓ Found trace ID: {trace_id}[/]")

    # Wait for instruction_adherence metric to be available
    console.print("\n[bold cyan]Waiting for instruction_adherence metric to be available...[/]")
    metrics = galileo_api.wait_for_metrics(
        api_url, headers, project_id, trace_id, target_metric="instruction_adherence"
    )

    # If instruction_adherence metric not found, try again with a longer timeout
    if not galileo_api.has_target_metric(metrics, "instruction_adherence"):
        console.print(
            "[bold yellow]⚠ instruction_adherence metric not found on first attempt. Trying again with longer timeout...[/]"
        )
        metrics = galileo_api.wait_for_metrics(
            api_url,
            headers,
            project_id,
            trace_id,
            max_wait_time=max_wait_time * 1.5,
            target_metric="instruction_adherence",
        )  # 50% longer timeout

    # Display metrics
    display.display_metrics(metrics)

    return content, metrics


def main():
    """Main function"""
    console.print(
        Panel(
            "[bold blue]Galileo Quickstart Testbed[/]\n\n"
            "This script demonstrates the difference between a simple prompt and an improved prompt\n"
            "with specific constraints, showing how instruction adherence metrics can be improved.",
            title="[bold blue]Welcome[/]",
            border_style="blue",
        )
    )

    # Check environment variables
    if not config.check_environment_variables():
        return

    # Set up API configuration
    api_url, api_key, project_name, log_stream_name = config.setup_api_config()

    # Get authentication token
    auth_token = galileo_api.get_auth_token(api_url, api_key)

    # API headers with token
    headers = config.setup_headers(auth_token, api_key)

    # Get project and log stream IDs
    project_id, log_stream_id = galileo_api.get_project_and_log_stream_ids(
        api_url, headers, project_name, log_stream_name
    )

    if not project_id or not log_stream_id:
        console.print("[bold red]✗ Cannot proceed without project and log stream IDs[/]")
        return

    # Initialize Galileo client for OpenAI
    console.print("[bold cyan]Initializing Galileo client for OpenAI...[/]")
    openai_api_key = os.environ.get("OPENAI_API_KEY")

    try:
        client = openai.OpenAI(api_key=openai_api_key)
        console.print("[bold green]✓ Galileo client initialized successfully[/]")
    except Exception as e:
        console.print(f"[bold red]✗ Error initializing Galileo client: {str(e)}[/]")
        return

    # Run the original prompt test
    original_result = run_test_with_metrics(
        client, run_original_prompt, "Testing Original Prompt", api_url, headers, project_id, log_stream_id
    )

    # Add a delay between tests
    console.print("[bold blue]Waiting 5 seconds before running the next test...[/]")
    time.sleep(5)

    # Run the improved prompt test
    improved_result = run_test_with_metrics(
        client, run_improved_prompt, "Testing Improved Prompt", api_url, headers, project_id, log_stream_id
    )

    # Check word count for improved prompt
    improved_content = improved_result[0]
    if improved_content:
        display.display_word_count(improved_content, max_words=15)

    # Compare the results
    console.rule("[bold blue]Comparison of Results", style="blue")
    display.compare_metrics(original_result[1], improved_result[1], "instruction_adherence")

    # Print summary
    console.rule("[bold blue]Test Summary", style="blue")
    console.print(
        Panel(
            "[bold green]Test completed successfully![/]\n\n"
            "This demonstration shows how adding specific, measurable constraints to a prompt\n"
            "can significantly improve instruction adherence metrics. The improved prompt\n"
            "'Explain Newton's First Law in exactly 15 words or less' provides clear guidance\n"
            "that the model can follow, resulting in better adherence scores compared to the\n"
            "original prompt 'Explain the following topic succinctly: Newton's First Law'.",
            title="[bold blue]Summary[/]",
            border_style="green",
        )
    )


if __name__ == "__main__":
    main()
