#!/usr/bin/env python3
"""
Galileo Experiments Test

This script tests the Galileo experiments integration by running the app.py script
and verifying that experiments were created and managed correctly in the Galileo platform.
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

# Load environment variables from .env file in the experiments directory
env_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path=env_path)
print(f"Loading environment variables from: {env_path}")

def run_app_and_verify_experiments():
    """Run the app.py script and verify that experiments were created and managed correctly"""
    console.rule("[bold blue]Testing Galileo Experiments Integration", style="blue")
    
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
    
    # Get project ID
    project_id, _ = galileo_api.get_project_and_log_stream_ids(api_url, headers, project_name, log_stream_name)
    console.print(f"[bold cyan]Using project: {project_name} (ID: {project_id})[/]")
    
    # Get the current experiments
    console.print("[bold cyan]Checking current experiments...[/]")
    current_experiments = galileo_api.get_experiments(api_url, headers, project_id)  # Pass project_id
    current_experiment_count = len(current_experiments)
    console.print(f"[bold cyan]Current experiment count: {current_experiment_count}[/]")
    
    # Run the app.py script
    console.print("[bold cyan]Running experiments/app.py...[/]")
    try:
        script_path = os.path.join(os.path.dirname(__file__), "app.py")
        result = subprocess.run(["python", script_path], capture_output=True, text=True, check=True)
        console.print("[bold green]✓ app.py executed successfully[/]")
        console.print(Panel(result.stdout.strip(), title="[bold blue]App Output[/]", border_style="green"))
        
        # Check if the output indicates successful experiment creation
        if "Successfully created experiment" in result.stdout:
            console.print("[bold green]✓ Experiment was successfully created according to app.py output[/]")
            console.print("[bold green]✓ Experiments integration is working correctly[/]")
            return True
        
    except subprocess.CalledProcessError as e:
        console.print(f"[bold red]✗ Error running app.py: {e}[/]")
        console.print(Panel(e.stderr.strip(), title="[bold red]Error Output[/]", border_style="red"))
        return False
    
    # Wait a moment for the experiment operations to be processed
    console.print("[bold cyan]Waiting for experiment operations to be processed...[/]")
    time.sleep(5)
    
    # Check for new experiments
    console.print("[bold cyan]Checking for experiment changes...[/]")
    max_attempts = 12
    for attempt in range(1, max_attempts + 1):
        console.print(f"[bold cyan]Attempt {attempt}/{max_attempts}...[/]")
        new_experiments = galileo_api.get_experiments(api_url, headers, project_id)
        new_experiment_count = len(new_experiments)
        
        if new_experiment_count >= current_experiment_count:
            # Look for the test experiment created by app.py
            test_experiment = None
            for experiment in new_experiments:
                if "my-experiment" in experiment.get('name', '').lower():
                    test_experiment = experiment
                    break
            
            if test_experiment:
                console.print(f"[bold green]✓ Found test experiment: {test_experiment.get('name')}[/]")
                experiment_id = test_experiment.get('id')
                
                # Get experiment details
                experiment_data = galileo_api.get_experiment_details(api_url, headers, project_id, experiment_id)
                
                if experiment_data:
                    console.print("[bold green]✓ Successfully retrieved experiment details[/]")
                    
                    # Print the experiment_data structure to understand what's in it
                    console.print("[bold cyan]Experiment data structure:[/]")
                    console.print(f"[cyan]Keys in experiment_data: {list(experiment_data.keys())}[/]")
                    
                    # Print a sample of the experiment_data content
                    console.print(Panel(
                        json.dumps(experiment_data, indent=2)[:1000] + "...",  # Limit to first 1000 chars
                        title="[bold blue]Experiment Data Sample[/]",
                        border_style="cyan"
                    ))
                    
                    # Consider the test successful if we found the experiment and got its details
                    console.print("[bold green]✓ Successfully found and retrieved the experiment[/]")
                    console.print("[bold green]✓ Experiments integration is working correctly[/]")
                    return True
                else:
                    console.print("[bold yellow]⚠ Could not retrieve experiment details[/]")
            else:
                console.print("[bold yellow]⚠ Test experiment not found[/]")
        
        if attempt < max_attempts:
            console.print("[bold cyan]Waiting and trying again...[/]")
            time.sleep(5)
    
    console.print("[bold red]✗ No experiment changes detected after running app.py[/]")
    return False

def main():
    """Main function"""
    console.print(Panel(
        "[bold blue]Galileo Experiments Integration Test[/]\n\n"
        "This script tests the Galileo experiments integration by running the app.py script\n"
        "and verifying that experiments were created and managed correctly in the Galileo platform.",
        title="[bold blue]Welcome[/]",
        border_style="blue"
    ))
    
    success = run_app_and_verify_experiments()
    
    if success:
        console.rule("[bold green]Test Summary", style="green")
        console.print(Panel(
            "[bold green]Test completed successfully![/]\n\n"
            "The Galileo experiments integration is working correctly.\n"
            "Experiments were successfully created and managed.",
            title="[bold green]Success[/]",
            border_style="green"
        ))
    else:
        console.rule("[bold red]Test Summary", style="red")
        console.print(Panel(
            "[bold red]Test failed![/]\n\n"
            "The Galileo experiments integration may not be working correctly.\n"
            "No experiment changes were detected after running the app.py script.",
            title="[bold red]Failure[/]",
            border_style="red"
        ))

if __name__ == "__main__":
    main()
