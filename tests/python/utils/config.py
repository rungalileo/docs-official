"""
Configuration Utilities

This module provides reusable functions for environment setup and configuration,
including loading environment variables and checking for required values.
"""

import os
from rich.console import Console
from rich.panel import Panel

# Initialize rich console
console = Console()

def check_environment_variables(required_vars=None):
    """
    Check if required environment variables are set and provide helpful error messages

    Args:
        required_vars: A list of required environment variable names (default: None)
                      If None, checks for standard Galileo variables

    Returns:
        True if all required variables are set, False otherwise
    """
    if required_vars is None:
        required_vars = [
            "GALILEO_CONSOLE_URL",
            "GALILEO_API_KEY",
            "GALILEO_PROJECT",
            "GALILEO_LOG_STREAM",
            "OPENAI_API_KEY"
        ]

    missing_vars = []

    for var in required_vars:
        if not os.environ.get(var):
            missing_vars.append(var)

    if missing_vars:
        console.print(Panel(
            f"[bold red]Missing required environment variables:[/]\n\n"
            f"[red]{', '.join(missing_vars)}[/]\n\n"
            f"Please create a .env file in the root directory with the following variables:\n"
            f"GALILEO_CONSOLE_URL=\"https://api.galileo.ai\"\n"
            f"GALILEO_PROJECT=\"your-project-name\"\n"
            f"GALILEO_LOG_STREAM=\"your-log-stream-name\"\n"
            f"GALILEO_API_KEY=\"your-galileo-api-key\"\n"
            f"OPENAI_API_KEY=\"your-openai-api-key\"\n",
            title="[bold red]Environment Error[/]",
            border_style="red"
        ))
        return False

    return True

def setup_api_config():
    """
    Set up API configuration from environment variables

    Returns:
        A tuple of (api_url, api_key, project_name, log_stream_name)
    """
    api_url = os.environ.get("GALILEO_CONSOLE_URL")
    api_key = os.environ.get("GALILEO_API_KEY")
    project_name = os.environ.get("GALILEO_PROJECT")
    log_stream_name = os.environ.get("GALILEO_LOG_STREAM")

    console.print("[bold cyan]API Configuration:[/]")
    console.print(f"API URL: {api_url}")
    console.print(f"Project: {project_name}")
    console.print(f"Log Stream: {log_stream_name}")

    return api_url, api_key, project_name, log_stream_name

def setup_headers(auth_token=None, api_key=None):
    """
    Set up API request headers with authentication

    Args:
        auth_token: The authentication token (optional)
        api_key: The API key (optional, used if auth_token is None)

    Returns:
        A dictionary of headers
    """
    headers = {}

    if auth_token:
        headers["Authorization"] = f"Bearer {auth_token}"
    elif api_key:
        headers["Authorization"] = f"Bearer {api_key}"
    else:
        console.print("[bold yellow]⚠ No authentication token or API key provided[/]")

    headers["Content-Type"] = "application/json"

    return headers
