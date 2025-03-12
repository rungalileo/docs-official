import os
import requests
import json
import uuid
from dotenv import load_dotenv
from rich.console import Console

# Initialize rich console
console = Console()

# Load environment variables from .env file
load_dotenv()

# API configuration
GALILEO_API_URL = os.environ.get("GALILEO_CONSOLE_URL", "https://api.galileo.ai")
GALILEO_API_KEY = os.environ.get("GALILEO_API_KEY")
GALILEO_PROJECT = os.environ.get("GALILEO_PROJECT", "quickstart_test_new3")

if not GALILEO_API_KEY:
    console.print("[bold red]Error: GALILEO_API_KEY environment variable is not set[/]")
    exit(1)

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

# List projects
def list_projects(headers):
    """List all projects in Galileo"""
    console.print("[bold cyan]Listing projects...[/]")
    
    url = f"{GALILEO_API_URL}/projects"
    
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        projects = response.json()
        console.print(f"[bold green]✓ Found {len(projects)} projects[/]")
        
        # Print the first few projects
        for project in projects:
            console.print(f"Project: {project.get('name')} (ID: {project.get('id')})")
        
        # Find the project by name
        project_id = None
        for project in projects:
            if project.get('name') == GALILEO_PROJECT:
                project_id = project.get('id')
                console.print(f"[bold green]✓ Found project ID for '{GALILEO_PROJECT}': {project_id}[/]")
                break
        
        return project_id
    else:
        console.print(f"[bold red]✗ Failed to list projects: {response.status_code}[/]")
        console.print(f"[red]{response.text}[/]")
        return None

# Register instruction adherence scorer
def register_scorer(project_id, headers):
    """Register instruction adherence scorer for a project"""
    console.print(f"[bold cyan]Registering instruction adherence scorer for project {project_id}...[/]")
    
    url = f"{GALILEO_API_URL}/projects/{project_id}/settings"
    
    # Create a simple payload with just the evaluate.metrics structure
    payload = {
        "evaluate": {
            "metrics": {
                "instruction_adherence": {
                    "enabled": True
                }
            }
        }
    }
    
    console.print(f"[bold yellow]Using payload: {json.dumps(payload, indent=2)}[/]")
    
    # Update the settings
    response = requests.put(url, headers=headers, json=payload)
    
    if response.status_code == 200:
        updated_settings = response.json()
        console.print(f"[bold green]✓ Scorer registered successfully[/]")
        console.print(f"[bold green]Updated settings: {json.dumps(updated_settings, indent=2)}[/]")
        return True
    else:
        console.print(f"[bold red]✗ Failed to register scorer: {response.status_code}[/]")
        console.print(f"[red]{response.text}[/]")
        return False

# Main function
def main():
    # Get authentication token
    auth_token = get_auth_token()
    
    # API headers with token
    headers = {}
    if auth_token:
        headers["Authorization"] = f"Bearer {auth_token}"
    else:
        headers["Authorization"] = f"Bearer {GALILEO_API_KEY}"
    headers["Content-Type"] = "application/json"
    
    # List projects and find the project ID
    project_id = list_projects(headers)
    
    if not project_id:
        console.print("[bold red]✗ Project not found. Please check the project name.[/]")
        return
    
    # Register instruction adherence scorer
    if register_scorer(project_id, headers):
        console.print("[bold green]✓ Successfully registered instruction adherence scorer[/]")
    else:
        console.print("[bold red]✗ Failed to register instruction adherence scorer.[/]")

if __name__ == "__main__":
    main() 