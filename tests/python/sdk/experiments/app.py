import os
from dotenv import load_dotenv
from galileo.datasets import get_dataset, create_dataset
from galileo.experiments import run_experiment
from galileo.prompts import get_prompt_template, create_prompt_template

# Load environment variables from .env file
load_dotenv()

try:
    # First, create a test dataset if it doesn't exist
    test_dataset = None
    try:
        test_dataset = get_dataset(name="storyteller-dataset")
        print(f"Using existing dataset: {test_dataset.name}")
    except:
        # Create a new dataset if it doesn't exist
        test_data = [
            {"question": "What continent is Spain in?", "answer": "Europe"},
            {"question": "What continent is Japan in?", "answer": "Asia"}
        ]
        test_dataset = create_dataset("storyteller-dataset", test_data)
        print(f"Created new dataset: {test_dataset.name}")

    # Create a prompt template if it doesn't exist
    test_prompt = None
    try:
        test_prompt = get_prompt_template(name="storyteller-prompt")
        print(f"Using existing prompt template: {test_prompt.name}")
    except:
        # Create a new prompt template if it doesn't exist
        # The API has changed and now requires 'messages' parameter instead of text
        messages = [
            {
                "role": "system",
                "content": """You are a storyteller. Create a short story based on the following question.
                Your story should be creative and engaging."""
            },
            {
                "role": "user",
                "content": "Question: {{question}}"
            }
        ]
        test_prompt = create_prompt_template("storyteller-prompt", messages)
        print(f"Created new prompt template: {test_prompt.name}")

    # Run an experiment with the prompt template
    project_name = os.getenv("GALILEO_PROJECT", "my-project")
    results = run_experiment(
        "my-experiment",
        dataset=test_dataset,
        prompt=test_prompt,
        metrics=["correctness"],
        project=project_name,
    )

    print(f"Successfully created experiment: my-experiment")
    if hasattr(results, 'id'):
        print(f"Experiment ID: {results.id}")
    else:
        print("Experiment created successfully, but ID not available")

except Exception as e:
    print(f"Error creating experiment: {str(e)}")
