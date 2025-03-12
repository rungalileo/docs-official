import os
import requests
import json
import time
import datetime
import uuid
from dotenv import load_dotenv
from galileo import openai
from rich.console import Console
from rich.panel import Panel
from rich.progress import Progress, SpinnerColumn, BarColumn, TextColumn, TimeElapsedColumn, TimeRemainingColumn
from rich.table import Table
from rich.text import Text
from rich.live import Live
from rich.layout import Layout
from rich.syntax import Syntax
from rich.markdown import Markdown

# Initialize rich console
console = Console()

# Load environment variables from .env file
load_dotenv()

# Check if required environment variables are set
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
    
    if not os.environ.get("OPENAI_API_KEY"):
        missing_vars.append("OPENAI_API_KEY")
    
    if missing_vars:
        console.print(Panel(
            f"[bold red]Missing required environment variables:[/]\n\n"
            f"[red]{', '.join(missing_vars)}[/]\n\n"
            f"Please create a .env file in the root directory with the following variables:\n"
            f"GALILEO_CONSOLE_URL=\"https://api.galileo.ai\"\n"
            f"GALILEO_PROJECT=\"your-project-name\"\n"
            f"GALILEO_LOG_STREAM=\"your-log-stream-name\"\n"
            f"GALILEO_API_KEY=\"your-galileo-api-key\"\n"
            f"OPENAI_API_KEY=\"your-openai-api-key\"\n\n"
            f"You can copy the .env.example file and update it with your actual API keys.",
            title="[bold red]Environment Error[/]",
            border_style="red"
        ))
        return False
    
    return True

# Check environment variables
if not check_environment_variables():
    exit(1)

# Initialize Galileo client for OpenAI
console.print("[bold cyan]Initializing Galileo client for OpenAI...[/]")
openai_api_key = os.environ.get("OPENAI_API_KEY")
console.print(f"[bold yellow]Debug: OpenAI API Key: {openai_api_key[:10]}...{openai_api_key[-4:] if openai_api_key else 'Not set'}[/]")
console.print(f"[bold yellow]Debug: OpenAI API Key format: {'sk-galileo-' in openai_api_key if openai_api_key else 'N/A'}[/]")

try:
    client = openai.OpenAI(api_key=openai_api_key)
    console.print(f"[bold green]✓ Galileo client initialized successfully[/]")
except Exception as e:
    console.print(f"[bold red]✗ Error initializing Galileo client: {str(e)}[/]")
    console.print(Panel(
        f"[bold red]Galileo Client Error[/]\n\n"
        f"Could not initialize the Galileo client for OpenAI. Please check:\n"
        f"1. Your OpenAI API key is correct\n"
        f"2. You have the correct version of the galileo package installed\n"
        f"3. You have the correct version of the openai package installed\n\n"
        f"Error details: {str(e)}",
        title="[bold red]Galileo Client Error[/]",
        border_style="red"
    ))
    exit(1)

# API configuration
GALILEO_API_URL = os.environ.get("GALILEO_CONSOLE_URL")
GALILEO_API_KEY = os.environ.get("GALILEO_API_KEY")
GALILEO_PROJECT = os.environ.get("GALILEO_PROJECT")
GALILEO_LOG_STREAM = os.environ.get("GALILEO_LOG_STREAM")

# Debug output for API configuration
console.print("[bold yellow]Debug: API Configuration[/]")
console.print(f"GALILEO_API_URL: {GALILEO_API_URL}")
console.print(f"GALILEO_PROJECT: {GALILEO_PROJECT}")
console.print(f"GALILEO_LOG_STREAM: {GALILEO_LOG_STREAM}")
console.print(f"GALILEO_API_KEY: {'*' * (len(GALILEO_API_KEY) - 4) + GALILEO_API_KEY[-4:] if GALILEO_API_KEY else 'Not set'}")

# Polling configuration
MAX_WAIT_TIME = 120  # Maximum wait time in seconds (2 minutes as specified)
POLLING_INTERVAL = 10  # Time between polling attempts in seconds (reduced for more frequent checks)

# Function to get project and log stream IDs
def get_project_and_log_stream_ids():
    """Get project and log stream IDs from the API"""
    console.print("[bold cyan]Fetching project and log stream IDs...[/]")
    
    # First, try to get projects
    projects_url = f"{GALILEO_API_URL}/projects"
    response = requests.get(projects_url, headers=headers)
    
    if response.status_code == 200:
        projects = response.json()
        console.print(f"[bold green]✓ Found {len(projects)} projects[/]")
        
        # Find the project by name
        project_id = None
        for project in projects:
            if project.get('name') == GALILEO_PROJECT:
                project_id = project.get('id')
                console.print(f"[bold green]✓ Found project ID: {project_id}[/]")
                break
        
        if not project_id:
            console.print(f"[bold yellow]⚠ Project '{GALILEO_PROJECT}' not found. Creating it now...[/]")
            project_id = create_project(GALILEO_PROJECT)
            if not project_id:
                return None, None
        
        # Now get log streams for this project
        log_streams_url = f"{GALILEO_API_URL}/projects/{project_id}/log_streams"
        response = requests.get(log_streams_url, headers=headers)
        
        if response.status_code == 200:
            log_streams = response.json()
            console.print(f"[bold green]✓ Found {len(log_streams)} log streams[/]")
            
            # Find the log stream by name
            log_stream_id = None
            for log_stream in log_streams:
                if log_stream.get('name') == GALILEO_LOG_STREAM:
                    log_stream_id = log_stream.get('id')
                    console.print(f"[bold green]✓ Found log stream ID: {log_stream_id}[/]")
                    break
            
            if not log_stream_id:
                console.print(f"[bold yellow]⚠ Log stream '{GALILEO_LOG_STREAM}' not found. Creating it now...[/]")
                log_stream_id = create_log_stream(project_id, GALILEO_LOG_STREAM)
            
            return project_id, log_stream_id
        else:
            console.print(f"[bold red]✗ Error fetching log streams: {response.status_code}[/]")
            console.print(f"[red]{response.text}[/]")
            return project_id, None
    else:
        console.print(f"[bold red]✗ Error fetching projects: {response.status_code}[/]")
        console.print(f"[red]{response.text}[/]")
        return None, None

# Create a new project
def create_project(name, description=None):
    """Create a new project in Galileo"""
    console.print(f"[bold cyan]Creating project '{name}'...[/]")
    
    url = f"{GALILEO_API_URL}/projects"
    
    payload = {
        "name": name,
        "description": description or f"Project created for {name}",
        "type": "gen_ai"  # Specify project type as gen_ai
    }
    
    response = requests.post(url, headers=headers, json=payload)
    
    if response.status_code == 200 or response.status_code == 201:
        project_data = response.json()
        console.print(f"[bold green]✓ Project created successfully[/]")
        console.print(f"[bold green]Project ID: {project_data.get('id')}[/]")
        
        # Enable metrics for the new project
        if enable_metrics(project_data.get('id')):
            console.print(f"[bold green]✓ Metrics enabled for the new project[/]")
        else:
            console.print(f"[bold red]✗ Failed to enable metrics for the new project[/]")
        
        return project_data.get('id')
    else:
        console.print(f"[bold red]✗ Failed to create project: {response.status_code}[/]")
        console.print(f"[red]{response.text}[/]")
        return None

# Create a log stream for the project
def create_log_stream(project_id, name):
    """Create a log stream for a project"""
    console.print(f"[bold cyan]Creating log stream '{name}' for project {project_id}...[/]")
    
    url = f"{GALILEO_API_URL}/projects/{project_id}/log_streams"
    
    payload = {
        "name": name,
        "description": f"Log stream created for {name}"
    }
    
    response = requests.post(url, headers=headers, json=payload)
    
    if response.status_code == 200 or response.status_code == 201:
        log_stream_data = response.json()
        console.print(f"[bold green]✓ Log stream created successfully[/]")
        console.print(f"[bold green]Log Stream ID: {log_stream_data.get('id')}[/]")
        return log_stream_data.get('id')
    else:
        console.print(f"[bold red]✗ Failed to create log stream: {response.status_code}[/]")
        console.print(f"[red]{response.text}[/]")
        return None

# Enable metrics for a project
def enable_metrics(project_id, metrics=None):
    """Enable metrics for a project"""
    if metrics is None:
        metrics = ["instruction_adherence"]
        
    console.print(f"[bold cyan]Enabling metrics for project {project_id}...[/]")
    
    url = f"{GALILEO_API_URL}/projects/{project_id}/settings"
    
    # Get current settings first
    response = requests.get(url, headers=headers)
    
    if response.status_code != 200:
        console.print(f"[bold red]✗ Failed to get project settings: {response.status_code}[/]")
        console.print(f"[red]{response.text}[/]")
        return False
    
    current_settings = response.json()
    
    # Check if metrics are already enabled
    metrics_already_enabled = True
    if "evaluate" in current_settings and "metrics" in current_settings["evaluate"]:
        for metric in metrics:
            if metric not in current_settings["evaluate"]["metrics"] or not current_settings["evaluate"]["metrics"][metric].get("enabled", False):
                metrics_already_enabled = False
                break
    else:
        metrics_already_enabled = False
    
    if metrics_already_enabled:
        console.print(f"[bold green]✓ Metrics are already enabled for this project[/]")
        return True
    
    # Create a new settings payload with a simpler structure
    settings = {}
    
    # Keep existing settings that we don't want to modify
    if "alerts_configuration" in current_settings:
        settings["alerts_configuration"] = current_settings["alerts_configuration"]
    
    # Create the evaluate.metrics structure
    settings["evaluate"] = {
        "metrics": {}
    }
    
    # Enable each metric in the evaluate.metrics structure
    for metric in metrics:
        settings["evaluate"]["metrics"][metric] = {"enabled": True}
    
    # Update the settings
    response = requests.put(url, headers=headers, json=settings)
    
    if response.status_code == 200:
        updated_settings = response.json()
        console.print(f"[bold green]✓ Metrics enabled successfully[/]")
        return True
    else:
        console.print(f"[bold red]✗ Failed to enable metrics: {response.status_code}[/]")
        console.print(f"[red]{response.text}[/]")
        return False

# Check if instruction adherence metric is enabled
def check_instruction_adherence_metric(project_id):
    """Check if instruction adherence metric is enabled for the project"""
    console.print("[bold cyan]Checking if instruction adherence metric is enabled...[/]")
    
    url = f"{GALILEO_API_URL}/projects/{project_id}/settings"
    
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        settings = response.json()
        
        if "evaluate" in settings and "metrics" in settings["evaluate"] and "instruction_adherence" in settings["evaluate"]["metrics"]:
            if settings["evaluate"]["metrics"]["instruction_adherence"].get("enabled", False):
                console.print("[bold green]✓ Instruction adherence metric is enabled[/]")
                return True
        
        console.print("[bold yellow]⚠ Instruction adherence metric is not enabled. Enabling it now...[/]")
        return enable_metrics(project_id, ["instruction_adherence"])
    else:
        console.print(f"[bold red]✗ Failed to get project settings: {response.status_code}[/]")
        console.print(f"[red]{response.text}[/]")
        return False

def format_time(seconds):
    """Format seconds into a readable time string"""
    return str(datetime.timedelta(seconds=int(seconds)))

def get_current_time():
    """Get current time formatted as a string"""
    return datetime.datetime.now().strftime("%H:%M:%S")

# Get authentication token
def get_auth_token():
    """Get authentication token using API key"""
    console.print("[bold cyan]Authenticating with Galileo API...[/]")
    
    auth_url = f"{GALILEO_API_URL}/login/api_key"
    auth_payload = {
        "api_key": GALILEO_API_KEY
    }
    auth_headers = {
        "Content-Type": "application/json"
    }
    
    try:
        response = requests.post(auth_url, headers=auth_headers, json=auth_payload)
        
        if response.status_code == 200:
            token_data = response.json()
            console.print(f"[bold green]✓ Authentication successful[/]")
            console.print(f"[bold green]Response: {json.dumps(token_data, indent=2)}[/]")
            
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
                f"2. The API URL is correct (currently: {GALILEO_API_URL})\n"
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
            f"1. The API URL is correct (currently: {GALILEO_API_URL})\n"
            f"2. You have network connectivity to the Galileo API\n"
            f"3. The Galileo API is not experiencing downtime\n\n"
            f"Error details: {str(e)}",
            title="[bold red]Connection Error[/]",
            border_style="red"
        ))
        return None

# Get authentication token
auth_token = get_auth_token()

# API headers with token
headers = {}
if auth_token:
    headers["Authorization"] = f"Bearer {auth_token}"
else:
    headers["Authorization"] = f"Bearer {GALILEO_API_KEY}"
headers["Content-Type"] = "application/json"

# Debug output for authentication
console.print(f"[bold yellow]Using authentication token: {auth_token is not None}[/]")
if auth_token:
    console.print(f"[bold yellow]Token: {auth_token[:10]}...{auth_token[-10:]}[/]")

# Get project and log stream IDs
PROJECT_ID, LOG_STREAM_ID = get_project_and_log_stream_ids()

if not PROJECT_ID or not LOG_STREAM_ID:
    console.print("[bold red]✗ Cannot proceed without project and log stream IDs[/]")
    console.print(Panel(
        f"[bold red]Project/Log Stream Error[/]\n\n"
        f"Could not find the project or log stream. Please check:\n"
        f"1. Your project name is correct (currently: {GALILEO_PROJECT})\n"
        f"2. Your log stream name is correct (currently: {GALILEO_LOG_STREAM})\n"
        f"3. You have access to the specified project and log stream\n"
        f"4. The project and log stream exist in your Galileo account\n\n"
        f"You may need to create the project and log stream in the Galileo console first.",
        title="[bold red]Project/Log Stream Error[/]",
        border_style="red"
    ))
    exit(1)

def get_traces_by_query(query_params=None):
    """Get traces from the Galileo API with optional query parameters"""
    # Use the correct endpoint for searching traces
    url = f"{GALILEO_API_URL}/projects/{PROJECT_ID}/traces/search"
    
    # Default parameters
    default_params = {
        "limit": 10,
        "order_by": "created_at",
        "order_direction": "desc",
        "log_stream_id": LOG_STREAM_ID
    }
    
    # Update with any provided parameters
    params = default_params.copy()
    if query_params:
        params.update(query_params)
    
    # Debug output for request
    console.print(f"[bold yellow]Debug: Sending request to {url}[/]")
    console.print(f"[bold yellow]Debug: Request params: {json.dumps(params, indent=2)}[/]")
    
    # Make the POST request
    response = requests.post(url, headers=headers, json=params)
    
    # Debug output for response
    console.print(f"[bold yellow]Debug: Response status: {response.status_code}[/]")
    
    if response.status_code == 200:
        result = response.json()
        console.print(f"[bold yellow]Debug: Response type: {type(result)}[/]")
        
        # Check if result is a dict with a 'records' field (new format)
        if isinstance(result, dict) and 'records' in result:
            traces = result['records']
            console.print(f"[bold yellow]Debug: Found {len(traces)} traces in 'records' field[/]")
            
            # Print the type and structure of the first few traces
            if traces and len(traces) > 0:
                console.print(f"[bold yellow]Debug: First trace type: {type(traces[0])}[/]")
                console.print(f"[bold yellow]Debug: First trace keys: {list(traces[0].keys()) if isinstance(traces[0], dict) else 'Not a dict'}[/]")
            
            return traces
        # Check if result is a dict with a 'traces' field (old format)
        elif isinstance(result, dict) and 'traces' in result:
            traces = result['traces']
            console.print(f"[bold yellow]Debug: Found {len(traces)} traces in 'traces' field[/]")
            
            # Print the type and structure of the first few traces
            if traces and len(traces) > 0:
                console.print(f"[bold yellow]Debug: First trace type: {type(traces[0])}[/]")
                console.print(f"[bold yellow]Debug: First trace keys: {list(traces[0].keys()) if isinstance(traces[0], dict) else 'Not a dict'}[/]")
            
            return traces
        # Check if result is a list
        elif isinstance(result, list):
            console.print(f"[bold yellow]Debug: Got {len(result)} traces[/]")
            
            # Print the type and structure of the first few traces
            if result and len(result) > 0:
                console.print(f"[bold yellow]Debug: First trace type: {type(result[0])}[/]")
                console.print(f"[bold yellow]Debug: First trace keys: {list(result[0].keys()) if isinstance(result[0], dict) else 'Not a dict'}[/]")
            
            return result
        else:
            # If result is not a list or dict with 'traces'/'records', print the full response
            console.print(f"[bold yellow]Debug: Full response: {json.dumps(result, indent=2)}[/]")
            console.print(f"[bold red]Error: Unexpected response format from traces API[/]")
            return []
    else:
        console.print(f"[bold red]Error fetching traces: {response.status_code}[/]")
        console.print(f"[red]{response.text}[/]")
        # Return a tuple with error information
        return [], response.status_code, response.text

def wait_for_trace_with_content(content_snippet, max_wait_time=MAX_WAIT_TIME):
    """
    Poll for a trace containing the specified content snippet
    Returns the trace ID when found or None if not found within max_wait_time
    """
    console.print(f"[bold cyan]Waiting for trace with content: '{content_snippet[:50]}...'[/]")
    console.print(f"[bold cyan]Maximum wait time: {format_time(max_wait_time)}[/]")
    
    start_time = time.time()
    attempt = 0
    
    while time.time() - start_time < max_wait_time:
        elapsed = time.time() - start_time
        attempt += 1
        
        console.print(f"[bold cyan]Polling attempt {attempt} for trace with content snippet...[/]")
        
        try:
            # Get recent traces
            result = get_traces_by_query()
            
            if not isinstance(result, list):
                console.print(f"[bold yellow]⚠ Unexpected result type: {type(result)}[/]")
                console.print(f"[bold yellow]Debug: Result: {result}[/]")
                time.sleep(POLLING_INTERVAL)
                continue
            
            console.print(f"[bold yellow]Debug: Found {len(result)} traces to check[/]")
            
            # Look for a trace with the content snippet
            for trace in result:
                if not isinstance(trace, dict):
                    continue
                
                # Debug output for trace structure
                if attempt == 1 and result.index(trace) == 0:
                    console.print(f"[bold yellow]Debug: Trace keys: {list(trace.keys())}[/]")
                
                # Check in various fields for the content
                if 'output' in trace:
                    output = trace['output']
                    if isinstance(output, str) and content_snippet in output:
                        console.print(f"[bold green]✓ Found matching trace after {int(elapsed)} seconds[/]")
                        return trace.get('id')
                    elif isinstance(output, dict) and 'content' in output and isinstance(output['content'], str) and content_snippet in output['content']:
                        console.print(f"[bold green]✓ Found matching trace after {int(elapsed)} seconds[/]")
                        return trace.get('id')
                
                # Check in content field
                if 'content' in trace and isinstance(trace['content'], str) and content_snippet in trace['content']:
                    console.print(f"[bold green]✓ Found matching trace after {int(elapsed)} seconds[/]")
                    return trace.get('id')
                
                # Check in spans
                spans = trace.get('spans', [])
                for span in spans:
                    if not isinstance(span, dict):
                        continue
                    
                    # Check in span content
                    if 'content' in span and isinstance(span['content'], str) and content_snippet in span['content']:
                        console.print(f"[bold green]✓ Found matching trace after {int(elapsed)} seconds[/]")
                        return trace.get('id')
                    
                    # Check in span response
                    if 'response' in span and isinstance(span['response'], dict):
                        response = span['response']
                        if 'content' in response and isinstance(response['content'], str) and content_snippet in response['content']:
                            console.print(f"[bold green]✓ Found matching trace after {int(elapsed)} seconds[/]")
                            return trace.get('id')
        except Exception as e:
            console.print(f"[bold yellow]⚠ Error searching for trace: {str(e)}[/]")
        
        # Wait before trying again
        console.print(f"[bold cyan]Waiting {POLLING_INTERVAL} seconds before next attempt...[/]")
        time.sleep(POLLING_INTERVAL)
    
    console.print(f"[bold yellow]⚠ Timed out after {format_time(max_wait_time)}. Trace not found.[/]")
    return None

def get_trace_data(trace_id):
    """Get trace data from the Galileo API"""
    url = f"{GALILEO_API_URL}/projects/{PROJECT_ID}/traces/{trace_id}"
    
    console.print(f"[bold yellow]Debug: Fetching trace data from {url}[/]")
    
    response = requests.get(url, headers=headers)
    
    console.print(f"[bold yellow]Debug: Trace data response status: {response.status_code}[/]")
    
    if response.status_code == 200:
        trace_data = response.json()
        
        # Debug trace data structure
        console.print(f"[bold yellow]Debug: Trace data type: {type(trace_data)}[/]")
        console.print(f"[bold yellow]Debug: Trace data keys: {list(trace_data.keys()) if isinstance(trace_data, dict) else 'Not a dict'}[/]")
        
        # Check if metrics exist
        if trace_data and isinstance(trace_data, dict) and 'metrics' in trace_data:
            console.print(f"[bold yellow]Debug: Found {len(trace_data['metrics'])} metrics in trace data[/]")
        
        return trace_data
    else:
        console.print(f"[bold red]Error fetching trace data: {response.status_code}[/]")
        console.print(f"[red]{response.text}[/]")
        # Return a tuple with error information
        return None, response.status_code, response.text

def wait_for_metrics(trace_id, max_wait_time=MAX_WAIT_TIME, target_metric="instruction_adherence"):
    """
    Poll for metrics for a specific trace, waiting specifically for the target_metric
    Returns the metrics when found or empty dict if not found within max_wait_time
    
    Args:
        trace_id: The trace ID to get metrics for
        max_wait_time: Maximum time to wait in seconds
        target_metric: The specific metric to wait for (default: instruction_adherence)
    """
    console.print(f"[bold cyan]Waiting for '{target_metric}' metric for trace {trace_id}...[/]")
    console.print(f"[bold cyan]Maximum wait time: {format_time(max_wait_time)}[/]")
    
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
                trace_data = get_trace_data(trace_id)
                
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
                url = f"{GALILEO_API_URL}/projects/{PROJECT_ID}/runs/{trace_id}/metrics"
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
                url = f"{GALILEO_API_URL}/projects/{PROJECT_ID}/traces/{trace_id}/metrics"
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
            time.sleep(POLLING_INTERVAL)
    
    console.print(f"[bold yellow]⚠ Timed out after {format_time(max_wait_time)}. '{target_metric}' metric not found.[/]")
    # Return an empty dict as a fallback
    return {}

def has_target_metric(metrics, target_metric):
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

def get_latest_trace():
    """Get the most recent trace from the Galileo API"""
    console.print("[bold cyan]Fetching the most recent trace...[/]")
    
    # Get recent traces with limit=1 to get only the most recent one
    traces = get_traces_by_query({"limit": 1})
    
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

def run_with_metrics(prompt, model="gpt-4o", description=None):
    """
    Run a prompt and wait for metrics to be available
    Returns a tuple of (response_content, metrics)
    """
    if description:
        console.rule(f"[bold blue]{description}", style="blue")
    
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
        return None, None
    
    # Print the response
    content = response.choices[0].message.content.strip()
    console.print("\n[bold cyan]Model Response[/]")
    console.print(Panel(content, border_style="green", expand=False))
    
    # Flush the logger to ensure all logs are sent to Galileo
    console.print("[bold cyan]Flushing Galileo logger...[/]")
    try:
        from galileo import galileo_context
        galileo_context.flush()
        console.print("[bold green]✓ Galileo logger flushed successfully[/]")
    except Exception as e:
        console.print(f"[bold yellow]⚠ Continuing without flush. Metrics may be delayed.[/]")
    
    # Get the latest trace ID (should be the one we just created)
    trace_id = get_latest_trace()
    
    if not trace_id:
        # Try waiting for the trace with the content
        console.print("[bold yellow]⚠ Could not get latest trace directly. Trying to find by content...[/]")
        trace_id = wait_for_trace_with_content(content)
    
    if not trace_id:
        console.print("[bold red]✗ Could not find the trace for this run[/]")
        return content, None
    
    console.print(f"[bold green]✓ Found trace ID: {trace_id}[/]")
    
    # Wait for instruction_adherence metric to be available
    console.print("\n[bold cyan]Waiting for instruction_adherence metric to be available...[/]")
    metrics = wait_for_metrics(trace_id, target_metric="instruction_adherence")
    
    # If instruction_adherence metric not found, try again with a longer timeout
    if not has_target_metric(metrics, "instruction_adherence"):
        console.print("[bold yellow]⚠ instruction_adherence metric not found on first attempt. Trying again with longer timeout...[/]")
        metrics = wait_for_metrics(trace_id, max_wait_time=MAX_WAIT_TIME * 1.5, target_metric="instruction_adherence")  # 50% longer timeout
    
    # Check if we got the instruction_adherence metric
    if not has_target_metric(metrics, "instruction_adherence"):
        console.print("[bold yellow]⚠ instruction_adherence metric not found after waiting. This could be because:[/]")
        console.print("[bold yellow]  1. The metric is still being computed[/]")
        console.print("[bold yellow]  2. The instruction_adherence metric is not enabled for this project[/]")
        console.print("[bold yellow]  3. There was an error in the metrics computation[/]")
        console.print("[bold yellow]Continuing with available metrics...[/]")
    
    # Display metrics
    display_metrics_result(metrics)
    
    return content, metrics

def display_metrics_result(metrics):
    """Display metrics in a formatted way"""
    console.print("\n[bold cyan]Metrics Results[/]")
    
    if not metrics or (isinstance(metrics, dict) and len(metrics) == 0) or (isinstance(metrics, list) and len(metrics) == 0):
        console.print("[bold yellow]⚠ No metrics found[/]")
        return
    
    # Create a table for metrics
    table = Table(title="Metrics", show_header=True, header_style="bold cyan")
    table.add_column("Metric Name", style="cyan")
    table.add_column("Score", style="cyan")
    table.add_column("Details", style="cyan")
    
    # Extract metrics based on format
    if isinstance(metrics, list):
        for metric in metrics:
            if isinstance(metric, dict):
                name = metric.get('name', 'Unknown')
                score = metric.get('score', 'N/A')
                explanation = metric.get('explanation', '')
                
                # Format the score for display
                score_str = f"{score:.4f}" if isinstance(score, (int, float)) else str(score)
                
                # Add row to table
                table.add_row(name, score_str, explanation[:50] + "..." if len(explanation) > 50 else explanation)
    elif isinstance(metrics, dict):
        for name, metric_data in metrics.items():
            if isinstance(metric_data, dict):
                score = metric_data.get('score', 'N/A')
                explanation = metric_data.get('explanation', '')
                
                # Format the score for display
                score_str = f"{score:.4f}" if isinstance(score, (int, float)) else str(score)
                
                # Add row to table
                table.add_row(name, score_str, explanation[:50] + "..." if len(explanation) > 50 else explanation)
            else:
                # If metric_data is not a dict, just display the value
                score_str = f"{metric_data:.4f}" if isinstance(metric_data, (int, float)) else str(metric_data)
                table.add_row(name, score_str, "")
    
    console.print(table)

def test_original_prompt():
    """Test the original prompt from the quickstart guide"""
    # Original prompt from the quickstart
    prompt = "Explain the following topic succinctly: Newton's First Law"
    
    # Run the prompt and get metrics
    content, metrics = run_with_metrics(prompt, description="Testing Original Prompt")
    
    return content, metrics

def test_improved_prompt():
    """Test the improved prompt from the quickstart guide"""
    # Improved prompt with more specific instructions
    prompt = "Explain Newton's First Law in exactly 15 words or less."
    
    # Run the prompt and get metrics
    content, metrics = run_with_metrics(prompt, description="Testing Improved Prompt")
    
    # Check word count
    word_count = len(content.split())
    console.print(f"\n[bold cyan]Word Count:[/] {word_count}")
    
    if word_count <= 15:
        console.print(f"[bold green]✓ Response contains {word_count} words (within the 15-word limit)[/]")
    else:
        console.print(f"[bold yellow]⚠ Response contains {word_count} words (exceeds the 15-word limit)[/]")
    
    return content, metrics

def compare_results(original_result, improved_result):
    """Compare the results of both prompts"""
    console.rule("[bold blue]Comparison of Results", style="blue")
    
    original_content, original_metrics = original_result
    improved_content, improved_metrics = improved_result
    
    if not original_content or not improved_content:
        console.print("[bold red]✗ Cannot compare results because one or both responses are missing.[/]")
        return
    
    if not original_metrics or not improved_metrics:
        console.print("[bold yellow]⚠ Cannot compare metrics because one or both metric sets are missing.[/]")
        return
    
    # Extract instruction adherence scores
    original_adherence = None
    improved_adherence = None
    
    # Extract from original metrics
    if isinstance(original_metrics, list):
        for metric in original_metrics:
            if metric.get('name') == "instruction_adherence":
                original_adherence = metric.get('score', 0)
                break
    elif isinstance(original_metrics, dict):
        if "instruction_adherence" in original_metrics:
            if isinstance(original_metrics["instruction_adherence"], dict):
                original_adherence = original_metrics["instruction_adherence"].get('score', 0)
            else:
                original_adherence = original_metrics["instruction_adherence"]
    
    # Extract from improved metrics
    if isinstance(improved_metrics, list):
        for metric in improved_metrics:
            if metric.get('name') == "instruction_adherence":
                improved_adherence = metric.get('score', 0)
                break
    elif isinstance(improved_metrics, dict):
        if "instruction_adherence" in improved_metrics:
            if isinstance(improved_metrics["instruction_adherence"], dict):
                improved_adherence = improved_metrics["instruction_adherence"].get('score', 0)
            else:
                improved_adherence = improved_metrics["instruction_adherence"]
    
    if original_adherence is not None and improved_adherence is not None:
        console.print("\n[bold cyan]Instruction Adherence Comparison[/]")
        
        # Calculate the improvement percentage
        improvement = ((improved_adherence - original_adherence) / original_adherence) * 100 if original_adherence > 0 else float('inf')
        
        # Create a comparison table
        table = Table(title="Instruction Adherence Comparison", show_header=True, header_style="bold cyan")
        table.add_column("Prompt", style="cyan")
        table.add_column("Score", style="cyan")
        table.add_column("Bar Chart", style="cyan", no_wrap=True)
        
        # Calculate bar lengths for visualization
        max_score = max(original_adherence, improved_adherence)
        original_bar_length = int((original_adherence / max_score) * 20) if max_score > 0 else 0
        improved_bar_length = int((improved_adherence / max_score) * 20) if max_score > 0 else 0
        
        # Add rows to the table
        table.add_row(
            "Original", 
            f"{original_adherence:.4f}", 
            f"[yellow]{'█' * original_bar_length}[/]{'░' * (20 - original_bar_length)}"
        )
        table.add_row(
            "Improved", 
            f"{improved_adherence:.4f}", 
            f"[green]{'█' * improved_bar_length}[/]{'░' * (20 - improved_bar_length)}"
        )
        
        console.print(table)
        
        # Print improvement summary
        if improved_adherence > original_adherence:
            console.print(f"[bold green]✓ Improvement: +{improvement:.2f}%[/]")
            console.print(Panel("[bold green]The improved prompt has better instruction adherence! 🎉[/]", border_style="green"))
        elif improved_adherence == original_adherence:
            console.print("[bold yellow]⚠ No change in instruction adherence.[/]")
        else:
            console.print(f"[bold red]✗ Decrease: {improvement:.2f}%[/]")
            console.print(Panel("[bold red]The improved prompt has worse instruction adherence.[/]", border_style="red"))
    else:
        console.print("[bold yellow]⚠ Could not compare metrics - one or both metrics are missing[/]")

if __name__ == "__main__":
    # Run tests
    start_time = time.time()
    
    # Check if instruction adherence metric is enabled
    if PROJECT_ID:
        metric_enabled = check_instruction_adherence_metric(PROJECT_ID)
        if not metric_enabled:
            console.print("[bold red]✗ Failed to enable instruction adherence metric. Tests may not work correctly.[/]")
    
    # Simple header
    console.print("\n[bold blue]===== Galileo Quickstart Test =====[/]")
    console.print(f"[bold blue]Project:[/] {GALILEO_PROJECT} (ID: {PROJECT_ID})")
    console.print(f"[bold blue]Log Stream:[/] {GALILEO_LOG_STREAM} (ID: {LOG_STREAM_ID})")
    console.print(f"[bold blue]Start Time:[/] {get_current_time()}")
    console.print(f"[bold blue]Maximum wait time for metrics:[/] {format_time(MAX_WAIT_TIME)}")
    console.print("[bold blue]=================================[/]\n")
    
    # Run the original prompt test
    original_result = test_original_prompt()
    
    # Add a delay between tests
    console.print("[bold blue]Waiting 5 seconds before running the next test...[/]")
    time.sleep(5)
    
    # Run the improved prompt test
    improved_result = test_improved_prompt()
    
    # Compare the results
    compare_results(original_result, improved_result)
    
    # Print summary
    total_elapsed = time.time() - start_time
    console.rule("[bold blue]Test Summary", style="blue")
    
    # Create a summary table
    summary_table = Table(show_header=False, box=None)
    summary_table.add_column("Item", style="bold blue")
    summary_table.add_column("Value", style="cyan")
    
    summary_table.add_row("Total execution time", format_time(total_elapsed))
    summary_table.add_row("End time", get_current_time())
    summary_table.add_row("Console URL", GALILEO_API_URL)
    
    console.print(summary_table)
    console.print(Panel("[bold green]Test completed successfully! 🎉[/]", border_style="green"))
