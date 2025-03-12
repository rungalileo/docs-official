"""
Galileo API Utilities

This module provides reusable functions for interacting with the Galileo API,
including authentication, fetching traces, and retrieving metrics.
"""

import os
import requests
import json
import time
from rich.console import Console
from rich.progress import Progress, SpinnerColumn, BarColumn, TextColumn, TimeElapsedColumn, TimeRemainingColumn

# Initialize rich console
console = Console()

def get_auth_token(api_url, api_key):
    """
    Get authentication token using API key
    
    Args:
        api_url: The Galileo API URL
        api_key: The Galileo API key
        
    Returns:
        The authentication token or None if authentication fails
    """
    console.print("[bold cyan]Authenticating with Galileo API...[/]")
    
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
            return None
    except Exception as e:
        console.print(f"[bold red]✗ Authentication error: {str(e)}[/]")
        return None

def get_project_and_log_stream_ids(api_url, headers, project_name, log_stream_name):
    """
    Get project and log stream IDs from the API
    
    Args:
        api_url: The Galileo API URL
        headers: The API request headers
        project_name: The name of the project
        log_stream_name: The name of the log stream
        
    Returns:
        A tuple of (project_id, log_stream_id)
    """
    console.print("[bold cyan]Fetching project and log stream IDs...[/]")
    
    # First, try to get projects
    projects_url = f"{api_url}/projects"
    response = requests.get(projects_url, headers=headers)
    
    if response.status_code == 200:
        projects = response.json()
        console.print(f"[bold green]✓ Found {len(projects)} projects[/]")
        
        # Find the project by name
        project_id = None
        for project in projects:
            if project.get('name') == project_name:
                project_id = project.get('id')
                console.print(f"[bold green]✓ Found project ID: {project_id}[/]")
                break
        
        if not project_id:
            console.print(f"[bold red]✗ Project '{project_name}' not found[/]")
            return None, None
        
        # Now get log streams for this project
        log_streams_url = f"{api_url}/projects/{project_id}/log_streams"
        response = requests.get(log_streams_url, headers=headers)
        
        if response.status_code == 200:
            log_streams = response.json()
            console.print(f"[bold green]✓ Found {len(log_streams)} log streams[/]")
            
            # Find the log stream by name
            log_stream_id = None
            for log_stream in log_streams:
                if log_stream.get('name') == log_stream_name:
                    log_stream_id = log_stream.get('id')
                    console.print(f"[bold green]✓ Found log stream ID: {log_stream_id}[/]")
                    break
            
            if not log_stream_id:
                console.print(f"[bold red]✗ Log stream '{log_stream_name}' not found[/]")
                return project_id, None
            
            return project_id, log_stream_id
        else:
            console.print(f"[bold red]✗ Error fetching log streams: {response.status_code}[/]")
            console.print(f"[red]{response.text}[/]")
            return project_id, None
    else:
        console.print(f"[bold red]✗ Error fetching projects: {response.status_code}[/]")
        console.print(f"[red]{response.text}[/]")
        return None, None

def get_traces_by_query(api_url, headers, project_id, log_stream_id, query_params=None):
    """
    Get traces from the Galileo API with optional query parameters
    
    Args:
        api_url: The Galileo API URL
        headers: The API request headers
        project_id: The project ID
        log_stream_id: The log stream ID
        query_params: Optional query parameters
        
    Returns:
        A list of traces
    """
    # Use the correct endpoint for searching traces
    url = f"{api_url}/projects/{project_id}/traces/search"
    
    # Default parameters
    default_params = {
        "limit": 10,
        "order_by": "created_at",
        "order_direction": "desc",
        "log_stream_id": log_stream_id
    }
    
    # Update with any provided parameters
    params = default_params.copy()
    if query_params:
        params.update(query_params)
    
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

def get_latest_trace(api_url, headers, project_id, log_stream_id):
    """
    Get the most recent trace from the Galileo API
    
    Args:
        api_url: The Galileo API URL
        headers: The API request headers
        project_id: The project ID
        log_stream_id: The log stream ID
        
    Returns:
        The trace ID of the most recent trace or None if no traces are found
    """
    console.print("[bold cyan]Fetching the most recent trace...[/]")
    
    # Get recent traces with limit=1 to get only the most recent one
    traces = get_traces_by_query(api_url, headers, project_id, log_stream_id, {"limit": 1})
    
    if not isinstance(traces, list) or len(traces) == 0:
        console.print("[bold red]✗ No recent traces found[/]")
        return None
    
    # Return the first (most recent) trace
    trace = traces[0]
    trace_id = trace.get('id', None)
    
    if trace_id:
        console.print(f"[bold green]✓ Found most recent trace: {trace_id}[/]")
        return trace_id
    else:
        console.print("[bold red]✗ Could not get trace ID from the most recent trace[/]")
        return None

def get_trace_data(api_url, headers, project_id, trace_id):
    """
    Get trace data from the Galileo API
    
    Args:
        api_url: The Galileo API URL
        headers: The API request headers
        project_id: The project ID
        trace_id: The trace ID
        
    Returns:
        The trace data or None if the trace is not found
    """
    url = f"{api_url}/projects/{project_id}/traces/{trace_id}"
    
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        trace_data = response.json()
        return trace_data
    else:
        console.print(f"[bold red]Error fetching trace data: {response.status_code}[/]")
        console.print(f"[red]{response.text}[/]")
        return None

def has_target_metric(metrics, target_metric="instruction_adherence"):
    """
    Check if the target metric exists in the metrics data
    
    Args:
        metrics: The metrics data (dict or list)
        target_metric: The specific metric to check for
        
    Returns:
        True if the target metric exists and has a value, False otherwise
    """
    if not metrics:
        return False
        
    if isinstance(metrics, list):
        for metric in metrics:
            if isinstance(metric, dict) and metric.get('name') == target_metric:
                return True
    elif isinstance(metrics, dict):
        if target_metric in metrics:
            return True
    
    return False

def wait_for_metrics(api_url, headers, project_id, trace_id, max_wait_time=120, polling_interval=10, target_metric="instruction_adherence"):
    """
    Poll for metrics for a specific trace, waiting specifically for the target_metric
    
    Args:
        api_url: The Galileo API URL
        headers: The API request headers
        project_id: The project ID
        trace_id: The trace ID
        max_wait_time: Maximum time to wait in seconds (default: 120)
        polling_interval: Time between polling attempts in seconds (default: 10)
        target_metric: The specific metric to wait for (default: "instruction_adherence")
        
    Returns:
        The metrics when found or empty dict if not found within max_wait_time
    """
    console.print(f"[bold cyan]Waiting for '{target_metric}' metric for trace {trace_id}...[/]")
    console.print(f"[bold cyan]Maximum wait time: {max_wait_time} seconds[/]")
    
    start_time = time.time()
    attempt = 0
    
    # Create a progress bar for waiting
    with Progress(
        SpinnerColumn(),
        TextColumn(f"[bold blue]Waiting for '{target_metric}' metric..."),
        BarColumn(),
        TextColumn("[bold blue]{task.percentage:.0f}%"),
        TimeElapsedColumn(),
        TimeRemainingColumn(),
        expand=True
    ) as progress:
        task = progress.add_task("[cyan]Polling...", total=max_wait_time)
        
        # Keep trying until we find metrics or time out
        while time.time() - start_time < max_wait_time:
            elapsed = time.time() - start_time
            attempt += 1
            
            # Update progress bar
            progress.update(task, completed=min(elapsed, max_wait_time))
            
            # Try multiple methods to get metrics
            metrics = None
            
            # Method 1: Get trace data and check metrics field
            try:
                trace_data = get_trace_data(api_url, headers, project_id, trace_id)
                
                # Check if trace data has metrics
                if trace_data and isinstance(trace_data, dict) and 'metrics' in trace_data:
                    metrics = trace_data['metrics']
                    
                    # Check if the target metric exists and has a value
                    if has_target_metric(metrics, target_metric):
                        console.print(f"[bold green]✓ Found '{target_metric}' metric in trace data (attempt {attempt})[/]")
                        return metrics
                    else:
                        console.print(f"[bold yellow]⚠ Metrics found but '{target_metric}' not present yet (attempt {attempt})[/]")
            except Exception as e:
                pass
            
            # Method 2: Try runs API
            try:
                url = f"{api_url}/projects/{project_id}/runs/{trace_id}/metrics"
                response = requests.get(url, headers=headers)
                
                if response.status_code == 200:
                    metrics = response.json()
                    
                    # Check if the target metric exists and has a value
                    if has_target_metric(metrics, target_metric):
                        console.print(f"[bold green]✓ Found '{target_metric}' metric in runs API (attempt {attempt})[/]")
                        return metrics
                    else:
                        console.print(f"[bold yellow]⚠ Metrics found but '{target_metric}' not present yet (attempt {attempt})[/]")
            except Exception as e:
                pass
            
            # Method 3: Try a different endpoint format
            try:
                url = f"{api_url}/projects/{project_id}/traces/{trace_id}/metrics"
                response = requests.get(url, headers=headers)
                
                if response.status_code == 200:
                    metrics = response.json()
                    
                    # Check if the target metric exists and has a value
                    if has_target_metric(metrics, target_metric):
                        console.print(f"[bold green]✓ Found '{target_metric}' metric in alternative API endpoint (attempt {attempt})[/]")
                        return metrics
                    else:
                        console.print(f"[bold yellow]⚠ Metrics found but '{target_metric}' not present yet (attempt {attempt})[/]")
            except Exception as e:
                pass
            
            # Wait before trying again
            time.sleep(polling_interval)
    
    console.print(f"[bold yellow]⚠ Timed out after {max_wait_time} seconds. '{target_metric}' metric not found.[/]")
    # Return an empty dict as a fallback
    return {} 