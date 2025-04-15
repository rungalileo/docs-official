import os
from dotenv import load_dotenv
from galileo.datasets import create_dataset

# Load environment variables from .env file
load_dotenv()

# Create a dataset with test data
test_data = [
    {
        "input": "Which continent is Spain in?",
        "output": "Europe",
    },
    {
        "input": "Which continent is Japan in?",
        "output": "Asia",
    },
]

try:
    dataset = create_dataset(
        name="test_dataset", 
        content=test_data,
    )
    
    # Print dataset information
    print(f"Successfully created dataset: {dataset.name if hasattr(dataset, 'name') else 'Unknown'}")
    print(f"Dataset ID: {dataset.id if hasattr(dataset, 'id') else 'Unknown'}")
except Exception as e:
    print(f"Error creating dataset: {str(e)}") 
