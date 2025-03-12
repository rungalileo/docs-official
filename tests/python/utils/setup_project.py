import os
import requests
import json
from dotenv import load_dotenv
from rich.console import Console

# Initialize rich console
console = Console()

# Load environment variables from .env file
load_dotenv()

# API configuration
GALILEO_API_URL = os.environ.get("GALILEO_CONSOLE_URL", "https://api.galileo.ai")
GALILEO_API_KEY = os.environ.get("GALILEO_API_KEY")

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
                console.print(f"[bold cyan]Token: {token}[/]")
            elif 'access_token' in token_data:
                token = token_data['access_token']
                console.print(f"[bold cyan]Aceess Token: {token}[/]")
            elif 'jwt' in token_data:
                token = token_data['jwt']
                console.print(f"[bold cyan]JWT: {token}[/]")
            if token:
                console.print(f"[bold green]✓ Token retrieved successfully[/]")
                # console.print(f"[bold cyan]Token: {token}[/]")
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
        return project_data
    elif response.status_code == 422 and "A project with this name already exists" in response.text:
        console.print(f"[bold yellow]⚠ Project '{name}' already exists. Fetching existing project details...[/]")
        
        # Get all projects
        projects_url = f"{GALILEO_API_URL}/projects"
        projects_response = requests.get(projects_url, headers=headers)
        
        if projects_response.status_code == 200:
            projects = projects_response.json()
            
            # Find the project with the matching name
            for project in projects:
                if project.get("name") == name:
                    console.print(f"[bold green]✓ Found existing project[/]")
                    console.print(f"[bold green]Project ID: {project.get('id')}[/]")
                    return project
            
            console.print(f"[bold red]✗ Could not find existing project with name '{name}'[/]")
            return None
        else:
            console.print(f"[bold red]✗ Failed to fetch projects: {projects_response.status_code}[/]")
            console.print(f"[red]{projects_response.text}[/]")
            return None
    else:
        console.print(f"[bold red]✗ Failed to create project: {response.status_code}[/]")
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
    console.print(f"[bold yellow]Current settings: {json.dumps(current_settings, indent=2)}[/]")
    
    # Check if metrics are already enabled
    if verify_metrics_enabled(project_id, metrics):
        console.print(f"[bold yellow]⚠ Metrics are already enabled correctly. Continuing...[/]")
        return True
    
    # Create a simpler settings payload focused on enabling the instruction_adherence metric
    settings = {
        "scorers_configuration": {
            "instruction_adherence": True
        }
    }
    
    # Keep existing settings that we don't want to modify
    if "alerts_configuration" in current_settings:
        settings["alerts_configuration"] = current_settings["alerts_configuration"]
    
    console.print(f"[bold yellow]Using settings payload: {json.dumps(settings, indent=2)}[/]")
    
    # Update the settings
    response = requests.put(url, headers=headers, json=settings)
    
    if response.status_code == 200:
        updated_settings = response.json()
        console.print(f"[bold green]✓ Metrics enabled successfully[/]")
        console.print(f"[bold green]Updated settings: {json.dumps(updated_settings, indent=2)}[/]")
        return True
    else:
        console.print(f"[bold red]✗ Failed to enable metrics: {response.status_code}[/]")
        console.print(f"[red]{response.text}[/]")
        return False

# Verify metrics are enabled for a project
def verify_metrics_enabled(project_id, metrics=None):
    """Verify that metrics are enabled for a project"""
    if metrics is None:
        metrics = ["instruction_adherence"]
        
    console.print(f"[bold cyan]Verifying metrics for project {project_id}...[/]")
    
    url = f"{GALILEO_API_URL}/projects/{project_id}/settings"
    
    # Get current settings
    response = requests.get(url, headers=headers)
    
    if response.status_code != 200:
        console.print(f"[bold red]✗ Failed to get project settings: {response.status_code}[/]")
        console.print(f"[red]{response.text}[/]")
        return False
    
    settings = response.json()
    console.print(f"[bold yellow]Verification - Current settings: {json.dumps(settings, indent=2)}[/]")
    
    # Check for instruction_adherence in scorers_configuration if it exists
    if "scorers_configuration" in settings:
        for metric in metrics:
            if metric in settings["scorers_configuration"]:
                if settings["scorers_configuration"][metric] == True:
                    console.print(f"[bold green]✓ Metric '{metric}' is enabled in scorers_configuration[/]")
                    return True
                else:
                    console.print(f"[bold red]✗ Metric '{metric}' is disabled in scorers_configuration[/]")
            else:
                console.print(f"[bold red]✗ Metric '{metric}' not found in scorers_configuration[/]")
    else:
        console.print(f"[bold yellow]⚠ 'scorers_configuration' not found in settings, checking customized_scorers_configuration[/]")
    
    # Check for instruction_adherence in customized_scorers_configuration if it exists
    if "customized_scorers_configuration" in settings:
        for scorer in settings["customized_scorers_configuration"]:
            if scorer.get("scorer_name") == "_customized_instruction_adherence":
                console.print(f"[bold green]✓ Customized scorer for instruction_adherence found[/]")
                return True
        console.print(f"[bold red]✗ No customized scorer for instruction_adherence found[/]")
    else:
        console.print(f"[bold yellow]⚠ 'customized_scorers_configuration' not found in settings[/]")
    
    # Check for instruction_adherence in scorers_config.scorers if it exists
    if "scorers_config" in settings and "scorers" in settings["scorers_config"]:
        for scorer in settings["scorers_config"]["scorers"]:
            if scorer.get("name") == "instruction_adherence":
                console.print(f"[bold green]✓ Metric 'instruction_adherence' found in scorers[/]")
                return True
        console.print(f"[bold red]✗ Metric 'instruction_adherence' not found in scorers[/]")
    else:
        console.print(f"[bold yellow]⚠ 'scorers_config.scorers' not found in settings[/]")
    
    console.print(f"[bold red]✗ Metrics verification failed[/]")
    return False

# Create a log stream for the project
def create_log_stream(project_id, name):
    """Create a log stream for a project"""
    console.print(f"[bold cyan]Creating log stream '{name}' for project {project_id}...[/]")
    
    # First check if a log stream with this name already exists
    list_url = f"{GALILEO_API_URL}/projects/{project_id}/log_streams"
    list_response = requests.get(list_url, headers=headers)
    
    if list_response.status_code == 200:
        log_streams = list_response.json()
        for log_stream in log_streams:
            if log_stream.get("name") == name:
                console.print(f"[bold yellow]⚠ Log stream '{name}' already exists[/]")
                console.print(f"[bold green]Log Stream ID: {log_stream.get('id')}[/]")
                return log_stream
    
    # Create a new log stream
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
        return log_stream_data
    else:
        console.print(f"[bold red]✗ Failed to create log stream: {response.status_code}[/]")
        console.print(f"[red]{response.text}[/]")
        return None

# Main function
def main():
    # Get project name from command line or use default
    import sys
    project_name = sys.argv[1] if len(sys.argv) > 1 else "quickstart_test-3"
    log_stream_name = sys.argv[2] if len(sys.argv) > 2 else "dev"
    
    # Create project
    project = create_project(project_name)
    if not project:
        return
    
    project_id = project.get('id')
    
    # Enable metrics
    if not enable_metrics(project_id, ["instruction_adherence"]):
        return
    
    # Verify metrics are enabled
    if not verify_metrics_enabled(project_id, ["instruction_adherence"]):
        console.print("[bold red]✗ Failed to verify metrics are enabled. Please check the Galileo console.[/]")
        return
    
    # Create log stream
    log_stream = create_log_stream(project_id, log_stream_name)
    if not log_stream:
        return
    
    log_stream_id = log_stream.get('id')
    
    # Print summary
    console.print("\n[bold green]✓ Setup completed successfully![/]")
    console.print(f"[bold cyan]Project Name:[/] {project_name}")
    console.print(f"[bold cyan]Project ID:[/] {project_id}")
    console.print(f"[bold cyan]Log Stream Name:[/] {log_stream_name}")
    console.print(f"[bold cyan]Log Stream ID:[/] {log_stream_id}")
    
    # Update .env file with new project and log stream
    console.print("\n[bold cyan]Updating .env file...[/]")
    
    # Create .env file in the current directory (tests/python/getting-started)
    env_file = os.path.join(os.path.dirname(os.path.abspath(__file__)), ".env")
    env_vars = {}
    
    # Read existing .env file if it exists
    if os.path.exists(env_file):
        with open(env_file, "r") as f:
            for line in f:
                if "=" in line:
                    key, value = line.strip().split("=", 1)
                    env_vars[key] = value
    
    # Update with new values
    env_vars["GALILEO_PROJECT"] = project_name
    env_vars["GALILEO_LOG_STREAM"] = log_stream_name
    env_vars["GALILEO_API_KEY"] = GALILEO_API_KEY
    env_vars["GALILEO_CONSOLE_URL"] = GALILEO_API_URL
    
    # Write back to .env file
    with open(env_file, "w") as f:
        for key, value in env_vars.items():
            f.write(f"{key}={value}\n")
    
    console.print(f"[bold green]✓ .env file created/updated in {env_file}[/]")
    console.print("\n[bold green]You can now run the quickstart.py script to test the project.[/]")

# Get authentication token
auth_token = get_auth_token()

# API headers with token
headers = {}
if auth_token:
    headers["Authorization"] = f"Bearer {auth_token}"
else:
    headers["Authorization"] = f"Bearer {GALILEO_API_KEY}"
headers["Content-Type"] = "application/json"

if __name__ == "__main__":
    main() 