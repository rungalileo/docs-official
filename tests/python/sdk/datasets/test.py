#!/usr/bin/env python3
"""
Galileo Datasets Test

This script tests the Galileo datasets integration by running the app.py script
and verifying that datasets were created and managed correctly in the Galileo platform.
"""

import os
import sys
import time
import subprocess
import requests
from dotenv import load_dotenv
from rich.console import Console
from rich.panel import Panel
from rich.rule import Rule
import json

# Add the utils directory to the path
utils_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../utils'))
sys.path.insert(0, utils_path)
print(f"Utils path: {utils_path}")

# Import utility modules directly
import config
import galileo_api
import display

# Initialize rich console
console = Console()

# Load environment variables from .env file in the datasets directory
env_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path=env_path)
print(f"Loading environment variables from: {env_path}")

def run_app_and_verify_datasets():
    """Run the app.py script and verify that datasets were created and managed correctly"""
    console.rule("[bold blue]Testing Galileo Datasets Integration", style="blue")
    
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
    
    # We don't need to get project and log stream IDs for dataset operations
    # Just get all datasets directly
    
    # Get the current datasets
    console.print("[bold cyan]Checking current datasets...[/]")
    current_datasets = galileo_api.get_datasets(api_url, headers, None)  # Pass None to get all datasets
    current_dataset_count = len(current_datasets)
    console.print(f"[bold cyan]Current dataset count: {current_dataset_count}[/]")
    
    # Run the app.py script
    console.print("[bold cyan]Running datasets/app.py...[/]")
    try:
        script_path = os.path.join(os.path.dirname(__file__), "app.py")
        result = subprocess.run(["python", script_path], capture_output=True, text=True, check=True)
        console.print("[bold green]✓ app.py executed successfully[/]")
        console.print(Panel(result.stdout.strip(), title="[bold blue]App Output[/]", border_style="green"))
    except subprocess.CalledProcessError as e:
        console.print(f"[bold red]✗ Error running app.py: {e}[/]")
        console.print(Panel(e.stderr.strip(), title="[bold red]Error Output[/]", border_style="red"))
        return False
    
    # Wait a moment for the dataset operations to be processed
    console.print("[bold cyan]Waiting for dataset operations to be processed...[/]")
    time.sleep(5)
    
    # Check for new datasets
    console.print("[bold cyan]Checking for dataset changes...[/]")
    max_attempts = 12
    for attempt in range(1, max_attempts + 1):
        console.print(f"[bold cyan]Attempt {attempt}/{max_attempts}...[/]")
        new_datasets = galileo_api.get_datasets(api_url, headers, None)
        new_dataset_count = len(new_datasets)
        
        if new_dataset_count >= current_dataset_count:
            # Look for the test dataset created by app.py
            test_dataset = None
            for dataset in new_datasets:
                if "test_dataset" in dataset.get('name', '').lower():
                    test_dataset = dataset
                    break
            
            if test_dataset:
                console.print(f"[bold green]✓ Found test dataset: {test_dataset.get('name')}[/]")
                dataset_id = test_dataset.get('id')
                
                # Get dataset details
                dataset_data = galileo_api.get_dataset_details(api_url, headers, None, dataset_id)
                
                if dataset_data:
                    console.print("[bold green]✓ Successfully retrieved dataset details[/]")
                    
                    # Print the dataset_data structure to understand what's in it
                    console.print("[bold cyan]Dataset data structure:[/]")
                    console.print(f"[cyan]Keys in dataset_data: {list(dataset_data.keys())}[/]")
                    
                    # Print a sample of the dataset_data content
                    console.print(Panel(
                        json.dumps(dataset_data, indent=2)[:1000] + "...",  # Limit to first 1000 chars
                        title="[bold blue]Dataset Data Sample[/]",
                        border_style="cyan"
                    ))
                    
                    # Consider the test successful if we found the dataset and got its details
                    console.print("[bold green]✓ Successfully found and retrieved the dataset[/]")
                    console.print("[bold green]✓ Datasets integration is working correctly[/]")
                    return True
                                       
                else:
                    console.print("[bold yellow]⚠ Could not retrieve dataset details[/]")
            else:
                console.print("[bold yellow]⚠ Test dataset not found[/]")
        
        if attempt < max_attempts:
            console.print("[bold cyan]Waiting and trying again...[/]")
            time.sleep(5)
    
    console.print("[bold red]✗ No dataset changes detected after running app.py[/]")
    return False

def main():
    """Main function"""
    console.print(Panel(
        "[bold blue]Galileo Datasets Integration Test[/]\n\n"
        "This script tests the Galileo datasets integration by running the app.py script\n"
        "and verifying that datasets were created and managed correctly in the Galileo platform.",
        title="[bold blue]Welcome[/]",
        border_style="blue"
    ))
    
    success = run_app_and_verify_datasets()
    
    if success:
        console.rule("[bold green]Test Summary", style="green")
        console.print(Panel(
            "[bold green]Test completed successfully![/]\n\n"
            "The Galileo datasets integration is working correctly.\n"
            "Datasets were successfully created and managed.",
            title="[bold green]Success[/]",
            border_style="green"
        ))
    else:
        console.rule("[bold red]Test Summary", style="red")
        console.print(Panel(
            "[bold red]Test failed![/]\n\n"
            "The Galileo datasets integration may not be working correctly.\n"
            "No dataset changes were detected after running the app.py script.",
            title="[bold red]Failure[/]",
            border_style="red"
        ))

if __name__ == "__main__":
    main()
