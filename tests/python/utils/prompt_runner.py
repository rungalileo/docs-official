"""
Prompt Runner Utilities

This module provides reusable functions for running prompts and collecting metrics,
including running prompts with Galileo tracking and waiting for metrics.
"""

import time
from rich.console import Console
from rich.panel import Panel
from rich.status import Status

from galileo import galileo_context
from . import galileo_api

# Initialize rich console
console = Console()

def run_prompt(client, prompt, model="gpt-4o"):
    """
    Run a prompt using the Galileo OpenAI client

    Args:
        client: An initialized Galileo OpenAI client
        prompt: The prompt to run
        model: The model to use (default: "gpt-4o")

    Returns:
        The model's response content
    """
    console.print(f"[bold blue]ℹ Prompt:[/] {prompt}")

    # Make API call with Galileo tracking
    console.print("\n[bold cyan]Making API call to OpenAI[/]")

    try:
        with console.status("[bold green]Sending request to OpenAI...", spinner="dots"):
            start_time = time.time()
            response = client.chat.completions.create(
                model=model,
                messages=[{"role": "system", "content": prompt}],
            )
            elapsed = time.time() - start_time

        console.print(f"[bold green]✓ API call completed in {elapsed:.2f} seconds[/]")
    except Exception as e:
        console.print(f"[bold red]✗ Error making API call: {str(e)}[/]")
        return None

    # Return the response content
    return response.choices[0].message.content.strip()

def run_with_metrics(client, prompt, api_url, headers, project_id, log_stream_id, model="gpt-4o", description=None, max_wait_time=120, target_metric="instruction_adherence"):
    """
    Run a prompt and wait for metrics to be available

    Args:
        client: An initialized Galileo OpenAI client
        prompt: The prompt to run
        api_url: The Galileo API URL
        headers: The API request headers
        project_id: The project ID
        log_stream_id: The log stream ID
        model: The model to use (default: "gpt-4o")
        description: A description of the prompt (optional)
        max_wait_time: Maximum time to wait for metrics in seconds (default: 120)
        target_metric: The specific metric to wait for (default: "instruction_adherence")

    Returns:
        A tuple of (response_content, metrics)
    """
    if description:
        console.rule(f"[bold blue]{description}", style="blue")

    # Run the prompt
    content = run_prompt(client, prompt, model)

    if not content:
        return None, None

    # Print the response
    console.print("\n[bold cyan]Model Response[/]")
    console.print(Panel(content, border_style="green", expand=False))

    # Flush the logger to ensure all logs are sent to Galileo
    console.print("[bold cyan]Flushing Galileo logger...[/]")
    try:
        galileo_context.flush()
        console.print("[bold green]✓ Galileo logger flushed successfully[/]")
    except Exception as e:
        console.print(f"[bold yellow]⚠ Continuing without flush. Metrics may be delayed.[/]")

    # Get the latest trace ID (should be the one we just created)
    trace_id = galileo_api.get_latest_trace(api_url, headers, project_id, log_stream_id)

    if not trace_id:
        console.print("[bold red]✗ Could not find the trace for this run[/]")
        return content, None

    console.print(f"[bold green]✓ Found trace ID: {trace_id}[/]")

    # Wait for the target metric to be available
    console.print(f"\n[bold cyan]Waiting for {target_metric} metric to be available...[/]")
    metrics = galileo_api.wait_for_metrics(api_url, headers, project_id, trace_id, max_wait_time=max_wait_time, target_metric=target_metric)

    # If target metric not found, try again with a longer timeout
    if not galileo_api.has_target_metric(metrics, target_metric):
        console.print(f"[bold yellow]⚠ {target_metric} metric not found on first attempt. Trying again with longer timeout...[/]")
        metrics = galileo_api.wait_for_metrics(api_url, headers, project_id, trace_id, max_wait_time=max_wait_time * 1.5, target_metric=target_metric)  # 50% longer timeout

    return content, metrics

def run_comparison(client, original_prompt, improved_prompt, api_url, headers, project_id, log_stream_id, model="gpt-4o", max_wait_time=120, target_metric="instruction_adherence", delay_between_runs=5):
    """
    Run both original and improved prompts and compare their metrics

    Args:
        client: An initialized Galileo OpenAI client
        original_prompt: The original prompt to run
        improved_prompt: The improved prompt to run
        api_url: The Galileo API URL
        headers: The API request headers
        project_id: The project ID
        log_stream_id: The log stream ID
        model: The model to use (default: "gpt-4o")
        max_wait_time: Maximum time to wait for metrics in seconds (default: 120)
        target_metric: The specific metric to wait for (default: "instruction_adherence")
        delay_between_runs: Time to wait between runs in seconds (default: 5)

    Returns:
        A tuple of (original_result, improved_result) where each result is a tuple of (content, metrics)
    """
    # Run the original prompt
    original_result = run_with_metrics(
        client,
        original_prompt,
        api_url,
        headers,
        project_id,
        log_stream_id,
        model=model,
        description="Testing Original Prompt",
        max_wait_time=max_wait_time,
        target_metric=target_metric
    )

    # Add a delay between tests
    if delay_between_runs > 0:
        console.print(f"[bold blue]Waiting {delay_between_runs} seconds before running the next test...[/]")
        time.sleep(delay_between_runs)

    # Run the improved prompt
    improved_result = run_with_metrics(
        client,
        improved_prompt,
        api_url,
        headers,
        project_id,
        log_stream_id,
        model=model,
        description="Testing Improved Prompt",
        max_wait_time=max_wait_time,
        target_metric=target_metric
    )

    return original_result, improved_result
