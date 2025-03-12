#!/usr/bin/env python3
"""
Galileo Trace Lister

This script lists all traces in a specified log stream for a Galileo project.
It reads the necessary credentials from a .env file.
"""

import os
import requests
import json
import time
from dotenv import load_dotenv
from rich.console import Console
from rich.table import Table
from rich.panel import Panel
from rich.progress import Progress, SpinnerColumn, TextColumn

# Initialize rich console for pretty output
console = Console()

# Load environment variables from .env file
load_dotenv()

# Debug: Print environment variables (with partial API key for security)
api_key = os.environ.get("GALILEO_API_KEY", "")
console.print(f"[bold yellow]Debug: API Key: {api_key[:5]}...{api_key[-4:] if len(api_key) > 9 else ''}[/]")
console.print(f"[bold yellow]Debug: Project: {os.environ.get('GALILEO_PROJECT', 'Not set')}[/]")
console.print(f"[bold yellow]Debug: Log Stream: {os.environ.get('GALILEO_LOG_STREAM', 'Not set')}[/]")
console.print(f"[bold yellow]Debug: API URL: {os.environ.get('GALILEO_CONSOLE_URL', 'Not set')}[/]")

# Constants
MAX_TRACES = 100  # Maximum number of traces to fetch
SHOW_METRICS = True  # Whether to show metrics for each trace

def check_environment_variables():
    """Check if required environment variables are set and provide helpful error messages"""
    missing_vars = []
    
    if not os.environ.get("GALILEO_CONSOLE_URL"):
        missing_vars.append("GALILEO_CONSOLE_URL")
    
    if not os.environ.get("GALILEO_API_KEY"):
        missing_vars.append("GALILEO_API_KEY")
    
    if not os.environ.get("GALILEO_PROJECT"):
        missing_vars.append("GALILEO_PROJECT")
    
    if not os.environ.get("GALILEO_LOG_STREAM"):
        missing_vars.append("GALILEO_LOG_STREAM")
    
    if missing_vars:
        console.print(Panel(
            f"[bold red]Missing required environment variables:[/]\n\n"
            f"[red]{', '.join(missing_vars)}[/]\n\n"
            f"Please create a .env file in the root directory with the following variables:\n"
            f"GALILEO_CONSOLE_URL=\"https://api.galileo.ai\"\n"
            f"GALILEO_PROJECT=\"your-project-name\"\n"
            f"GALILEO_LOG_STREAM=\"your-log-stream-name\"\n"
            f"GALILEO_API_KEY=\"your-galileo-api-key\"\n",
            title="[bold red]Environment Error[/]",
            border_style="red"
        ))
        return False
    
    return True

# Get authentication token
def get_auth_token():
    """Get authentication token using API key"""
    console.print("[bold cyan]Authenticating with Galileo API...[/]")
    
    api_url = os.environ.get("GALILEO_CONSOLE_URL")
    api_key = os.environ.get("GALILEO_API_KEY")
    
    auth_url = f"{api_url}/login/api_key"
    auth_payload = {
        "api_key": api_key
    }
    auth_headers = {
        "Content-Type": "application/json"
    }
    
    try:
        response = requests.post(auth_url, headers=auth_headers, json=auth_payload)
        
        if response.status_code == 200:
            token_data = response.json()
            console.print(f"[bold green]✓ Authentication successful[/]")
            
            # Check different possible token field names
            token = None
            if 'token' in token_data:
                token = token_data['token']
            elif 'access_token' in token_data:
                token = token_data['access_token']
            elif 'jwt' in token_data:
                token = token_data['jwt']
            
            if token:
                console.print(f"[bold green]✓ Token retrieved successfully[/]")
                return token
            else:
                console.print(f"[bold yellow]⚠ Token not found in response. Using API key instead.[/]")
                return None
        else:
            console.print(f"[bold red]✗ Authentication failed: {response.status_code}[/]")
            console.print(f"[red]{response.text}[/]")
            console.print(Panel(
                f"[bold red]Authentication Error[/]\n\n"
                f"Could not authenticate with the Galileo API. Please check:\n"
                f"1. Your API key is correct\n"
                f"2. The API URL is correct (currently: {api_url})\n"
                f"3. You have network connectivity to the Galileo API\n"
                f"4. Your account has the necessary permissions\n\n"
                f"Error details: {response.status_code} - {response.text}",
                title="[bold red]Authentication Error[/]",
                border_style="red"
            ))
            return None
    except Exception as e:
        console.print(f"[bold red]✗ Authentication error: {str(e)}[/]")
        console.print(Panel(
            f"[bold red]Connection Error[/]\n\n"
            f"Could not connect to the Galileo API. Please check:\n"
            f"1. The API URL is correct (currently: {api_url})\n"
            f"2. You have network connectivity to the Galileo API\n"
            f"3. The Galileo API is not experiencing downtime\n\n"
            f"Error details: {str(e)}",
            title="[bold red]Connection Error[/]",
            border_style="red"
        ))
        return None

def get_project_and_log_stream_ids():
    """Get the project ID and log stream ID from their names"""
    # API configuration
    api_url = os.environ.get("GALILEO_CONSOLE_URL")
    project_name = os.environ.get("GALILEO_PROJECT")
    log_stream_name = os.environ.get("GALILEO_LOG_STREAM")
    
    # Get project ID
    with Progress(
        SpinnerColumn(),
        TextColumn("[bold blue]Getting project ID...[/]"),
        transient=True
    ) as progress:
        progress.add_task("", total=None)
        
        # List projects
        projects_url = f"{api_url}/projects"
        response = requests.get(projects_url, headers=headers)
        
        if response.status_code != 200:
            console.print(f"[bold red]Error fetching projects: {response.status_code}[/]")
            console.print(f"[red]{response.text}[/]")
            return None, None
        
        projects = response.json()
        
        # Find project by name
        project_id = None
        for project in projects:
            if project.get("name") == project_name:
                project_id = project.get("id")
                break
        
        if not project_id:
            console.print(f"[bold red]Project '{project_name}' not found[/]")
            return None, None
    
    # Get log stream ID
    with Progress(
        SpinnerColumn(),
        TextColumn("[bold blue]Getting log stream ID...[/]"),
        transient=True
    ) as progress:
        progress.add_task("", total=None)
        
        # List log streams
        log_streams_url = f"{api_url}/projects/{project_id}/log_streams"
        response = requests.get(log_streams_url, headers=headers)
        
        if response.status_code != 200:
            console.print(f"[bold red]Error fetching log streams: {response.status_code}[/]")
            console.print(f"[red]{response.text}[/]")
            return project_id, None
        
        log_streams = response.json()
        
        # Find log stream by name
        log_stream_id = None
        for log_stream in log_streams:
            if log_stream.get("name") == log_stream_name:
                log_stream_id = log_stream.get("id")
                break
        
        if not log_stream_id:
            console.print(f"[bold red]Log stream '{log_stream_name}' not found[/]")
            return project_id, None
    
    return project_id, log_stream_id

def get_traces(project_id, log_stream_id, limit=MAX_TRACES):
    """Get traces from the Galileo API"""
    # API configuration
    api_url = os.environ.get("GALILEO_CONSOLE_URL")
    
    # Use the search endpoint for traces
    url = f"{api_url}/projects/{project_id}/traces/search"
    
    # Parameters for the search
    params = {
        "limit": limit,
        "order_by": "created_at",
        "order_direction": "desc",
        "log_stream_id": log_stream_id
    }
    
    with Progress(
        SpinnerColumn(),
        TextColumn(f"[bold blue]Fetching up to {limit} traces...[/]"),
        transient=True
    ) as progress:
        progress.add_task("", total=None)
        
        # Make the POST request
        response = requests.post(url, headers=headers, json=params)
    
    if response.status_code == 200:
        result = response.json()
        
        # Check if result is a dict with a 'records' field (new format)
        if isinstance(result, dict) and 'records' in result:
            traces = result['records']
            return traces
        # Check if result is a dict with a 'traces' field (old format)
        elif isinstance(result, dict) and 'traces' in result:
            traces = result['traces']
            return traces
        # Check if result is a list
        elif isinstance(result, list):
            return result
        else:
            console.print(f"[bold red]Error: Unexpected response format from traces API[/]")
            return []
    else:
        console.print(f"[bold red]Error fetching traces: {response.status_code}[/]")
        console.print(f"[red]{response.text}[/]")
        return []

def get_trace_metrics(project_id, trace_id):
    """Get metrics for a specific trace"""
    api_url = os.environ.get("GALILEO_CONSOLE_URL")
    
    # Try multiple methods to get metrics
    metrics = None
    
    # Method 1: Get trace data and check metrics field
    try:
        url = f"{api_url}/projects/{project_id}/traces/{trace_id}"
        response = requests.get(url, headers=headers)
        
        if response.status_code == 200:
            trace_data = response.json()
            
            if trace_data and isinstance(trace_data, dict) and 'metrics' in trace_data:
                metrics = trace_data['metrics']
                if metrics and (isinstance(metrics, dict) and len(metrics) > 0) or (isinstance(metrics, list) and len(metrics) > 0):
                    return metrics
    except Exception as e:
        pass
    
    # Method 2: Try runs API
    try:
        url = f"{api_url}/projects/{project_id}/runs/{trace_id}/metrics"
        response = requests.get(url, headers=headers)
        
        if response.status_code == 200:
            metrics = response.json()
            if metrics and ((isinstance(metrics, dict) and len(metrics) > 0) or (isinstance(metrics, list) and len(metrics) > 0)):
                return metrics
    except Exception as e:
        pass
    
    # Method 3: Try a different endpoint format
    try:
        url = f"{api_url}/projects/{project_id}/traces/{trace_id}/metrics"
        response = requests.get(url, headers=headers)
        
        if response.status_code == 200:
            metrics = response.json()
            if metrics and ((isinstance(metrics, dict) and len(metrics) > 0) or (isinstance(metrics, list) and len(metrics) > 0)):
                return metrics
    except Exception as e:
        pass
    
    # Return empty dict if no metrics found
    return {}

def display_metrics(metrics):
    """Display metrics in a table"""
    if not metrics or (isinstance(metrics, dict) and len(metrics) == 0) or (isinstance(metrics, list) and len(metrics) == 0):
        console.print("[bold yellow]No metrics found[/]")
        return
    
    # Create a table for metrics
    table = Table(title="Metrics", show_header=True, header_style="bold cyan")
    table.add_column("Metric Name", style="cyan")
    table.add_column("Score", style="cyan")
    
    # Add rows to the table
    if isinstance(metrics, list):
        for metric in metrics:
            if isinstance(metric, dict):
                name = metric.get('name', 'Unknown')
                score = metric.get('score', 'N/A')
                table.add_row(name, f"{score}")
    elif isinstance(metrics, dict):
        for name, metric in metrics.items():
            if isinstance(metric, dict):
                score = metric.get('score', 'N/A')
                table.add_row(name, f"{score}")
            else:
                table.add_row(name, str(metric))
    
    console.print(table)

def display_traces(project_id, traces):
    """Display traces in a table"""
    if not traces:
        console.print("[bold yellow]No traces found[/]")
        return
    
    console.print(f"[bold green]Found {len(traces)} traces[/]")
    
    # Create a table for traces
    table = Table(title="Traces", show_header=True, header_style="bold cyan")
    table.add_column("Trace ID", style="cyan")
    table.add_column("Created At", style="cyan")
    table.add_column("Input Snippet", style="cyan", max_width=40)
    table.add_column("Output Snippet", style="cyan", max_width=40)
    
    # Add rows to the table
    for trace in traces:
        if not isinstance(trace, dict):
            continue
        
        trace_id = trace.get('id', 'Unknown')
        created_at = trace.get('created_at', 'Unknown')
        
        # Try to extract input snippet
        input_snippet = "No input found"
        if 'input' in trace:
            input_data = trace['input']
            if isinstance(input_data, str):
                input_snippet = input_data[:40] + "..." if len(input_data) > 40 else input_data
            elif isinstance(input_data, dict):
                input_snippet = json.dumps(input_data)[:40] + "..." if len(json.dumps(input_data)) > 40 else json.dumps(input_data)
        
        # Try to extract output snippet
        output_snippet = "No output found"
        if 'output' in trace:
            output = trace['output']
            if isinstance(output, str):
                output_snippet = output[:40] + "..." if len(output) > 40 else output
            elif isinstance(output, dict) and 'content' in output and isinstance(output['content'], str):
                output_snippet = output['content'][:40] + "..." if len(output['content']) > 40 else output['content']
            elif isinstance(output, dict):
                output_snippet = json.dumps(output)[:40] + "..." if len(json.dumps(output)) > 40 else json.dumps(output)
        
        # Add row to table
        table.add_row(
            trace_id,
            created_at,
            input_snippet,
            output_snippet
        )
    
    console.print(table)
    
    # If SHOW_METRICS is True, display metrics for each trace
    if SHOW_METRICS:
        for trace in traces:
            if not isinstance(trace, dict):
                continue
            
            trace_id = trace.get('id', 'Unknown')
            
            console.print(f"\n[bold cyan]Metrics for trace {trace_id}:[/]")
            
            # Get metrics for this trace
            with Progress(
                SpinnerColumn(),
                TextColumn(f"[bold blue]Fetching metrics for trace {trace_id}...[/]"),
                transient=True
            ) as progress:
                progress.add_task("", total=None)
                metrics = get_trace_metrics(project_id, trace_id)
            
            # Display metrics
            display_metrics(metrics)

def main():
    """Main function"""
    console.print(Panel(
        "[bold blue]Galileo Trace Lister[/]\n\n"
        "This script lists all traces in a specified log stream for a Galileo project.",
        title="[bold blue]Welcome[/]",
        border_style="blue"
    ))
    
    # Check environment variables
    if not check_environment_variables():
        return
    
    # Get project and log stream IDs
    project_id, log_stream_id = get_project_and_log_stream_ids()
    
    if not project_id or not log_stream_id:
        return
    
    # Get traces
    traces = get_traces(project_id, log_stream_id)
    
    # Display traces and metrics
    display_traces(project_id, traces)

# Get authentication token
auth_token = get_auth_token()

# API headers with token
headers = {}
if auth_token:
    headers["Authorization"] = f"Bearer {auth_token}"
else:
    headers["Authorization"] = f"Bearer {os.environ.get('GALILEO_API_KEY')}"
headers["Content-Type"] = "application/json"

# Debug output for authentication
console.print(f"[bold yellow]Using authentication token: {auth_token is not None}[/]")
if auth_token:
    console.print(f"[bold yellow]Token: {auth_token[:10]}...{auth_token[-10:]}[/]")

if __name__ == "__main__":
    main()
