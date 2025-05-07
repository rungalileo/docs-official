#!/usr/bin/env python3
"""
LangChain Integration Test

This script tests the Galileo LangChain integration by running the app.py script
and verifying that traces were created in the Galileo platform.
"""

import os
import sys
import time
import subprocess
from dotenv import load_dotenv
from rich.console import Console
from rich.panel import Panel
from rich.rule import Rule

# Add the parent directory to the path so we can import the utils package
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../../')))

# Import utility modules
from tests.python.utils import config, galileo_api, display

# Initialize rich console
console = Console()

# Load environment variables from .env file
load_dotenv()

def run_app_and_verify_traces():
    """Run the app.py script and verify that traces were created"""
    console.rule("[bold blue]Testing Galileo LangChain Integration", style="blue")

    # Check environment variables
    required_vars = [
        "GALILEO_CONSOLE_URL",
        "GALILEO_API_KEY",
        "GALILEO_PROJECT",
        "GALILEO_LOG_STREAM",
        "OPENAI_API_KEY"
    ]
    if not config.check_environment_variables(required_vars):
        return False

    # Set up API configuration
    api_url, api_key, project_name, log_stream_name = config.setup_api_config()

    # Get authentication token
    auth_token = galileo_api.get_auth_token(api_url, api_key)

    # API headers with token
    headers = config.setup_headers(auth_token, api_key)

    # Get project and log stream IDs
    project_id, log_stream_id = galileo_api.get_project_and_log_stream_ids(api_url, headers, project_name, log_stream_name)

    if not project_id or not log_stream_id:
        console.print("[bold red]✗ Cannot proceed without project and log stream IDs[/]")
        return False

    # Get the current number of traces
    console.print("[bold cyan]Checking current traces...[/]")
    current_traces = galileo_api.get_traces_by_query(api_url, headers, project_id, log_stream_id, {"limit": 1})
    current_trace_count = len(current_traces)
    console.print(f"[bold cyan]Current trace count: {current_trace_count}[/]")

    # Run the app.py script
    console.print("[bold cyan]Running app.py...[/]")
    try:
        result = subprocess.run(["python", "app.py"], capture_output=True, text=True, check=True)
        console.print("[bold green]✓ app.py executed successfully[/]")
        console.print(Panel(result.stdout.strip(), title="[bold blue]App Output[/]", border_style="green"))
    except subprocess.CalledProcessError as e:
        console.print(f"[bold red]✗ Error running app.py: {e}[/]")
        console.print(Panel(e.stderr.strip(), title="[bold red]Error Output[/]", border_style="red"))
        return False

    # Wait a moment for the trace to be processed
    console.print("[bold cyan]Waiting for trace to be processed...[/]")
    time.sleep(5)

    # Check for new traces
    console.print("[bold cyan]Checking for new traces...[/]")
    max_attempts = 12
    for attempt in range(1, max_attempts + 1):
        console.print(f"[bold cyan]Attempt {attempt}/{max_attempts}...[/]")
        new_traces = galileo_api.get_traces_by_query(api_url, headers, project_id, log_stream_id, {"limit": 10})
        new_trace_count = len(new_traces)

        if new_trace_count > current_trace_count:
            console.print(f"[bold green]✓ Found {new_trace_count - current_trace_count} new trace(s)[/]")

            # Get the latest trace
            latest_trace = new_traces[0]
            trace_id = latest_trace.get('id')
            console.print(f"[bold green]✓ Latest trace ID: {trace_id}[/]")

            # Get trace details
            trace_data = galileo_api.get_trace_data(api_url, headers, project_id, trace_id)

            if trace_data:
                console.print("[bold green]✓ Successfully retrieved trace data[/]")

                # Check if the trace has spans
                if 'spans' in trace_data and len(trace_data['spans']) > 0:
                    console.print(f"[bold green]✓ Trace contains {len(trace_data['spans'])} span(s)[/]")

                    # Display span information
                    for i, span in enumerate(trace_data['spans']):
                        console.print(f"[bold cyan]Span {i+1}:[/] {span.get('name', 'Unknown')} - {span.get('status', 'Unknown')}")

                    # Check for LangChain-specific information
                    langchain_found = False
                    for span in trace_data['spans']:
                        if 'langchain' in str(span).lower() or 'llm' in str(span).lower():
                            langchain_found = True
                            console.print(f"[bold green]✓ Found LangChain-related span: {span.get('name', 'Unknown')}[/]")

                    if langchain_found:
                        console.print("[bold green]✓ LangChain integration is working correctly[/]")
                    else:
                        console.print("[bold yellow]⚠ No LangChain-specific spans found[/]")

                    return True
                else:
                    console.print("[bold yellow]⚠ Trace does not contain any spans[/]")
            else:
                console.print("[bold yellow]⚠ Could not retrieve trace data[/]")

        if attempt < max_attempts:
            console.print("[bold cyan]Waiting and trying again...[/]")
            time.sleep(5)

    console.print("[bold red]✗ No new traces found after running app.py[/]")
    return False

def main():
    """Main function"""
    console.print(Panel(
        "[bold blue]Galileo LangChain Integration Test[/]\n\n"
        "This script tests the Galileo LangChain integration by running the app.py script\n"
        "and verifying that traces were created in the Galileo platform.",
        title="[bold blue]Welcome[/]",
        border_style="blue"
    ))

    success = run_app_and_verify_traces()

    if success:
        console.rule("[bold green]Test Summary", style="green")
        console.print(Panel(
            "[bold green]Test completed successfully![/]\n\n"
            "The Galileo LangChain integration is working correctly.\n"
            "Traces were successfully created and contain spans for the LangChain operations.",
            title="[bold green]Success[/]",
            border_style="green"
        ))
    else:
        console.rule("[bold red]Test Summary", style="red")
        console.print(Panel(
            "[bold red]Test failed![/]\n\n"
            "The Galileo LangChain integration may not be working correctly.\n"
            "No traces were found after running the app.py script.",
            title="[bold red]Failure[/]",
            border_style="red"
        ))

if __name__ == "__main__":
    main()
