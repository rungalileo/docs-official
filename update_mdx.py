import os

# Map of file paths to nicely formatted titles
file_titles = {
    "what-is-galileo": "What is Galileo?",
    "quickstart/log/interactive-app": "Log Your First Eval (interactive app)",
    "quickstart/log/console": "Log Your First Eval (console)",
    "quickstart/log/notebook": "Log Your First Eval (notebook)",
    "quickstart/experiment/embedded-code": "Run an Experiment (embedded code)",
    "quickstart/experiment/console": "Run an Experiment (console)",
    "quickstart/experiment/notebook": "Run an Experiment (notebook)",
    "quickstart/experiment/playground-ui": "Run an Experiment (playground UI)",
    "guides/evals/overview": "Evals Overview",
    "guides/evals/function-based": "Function-Based Evaluators",
    "guides/evals/class-based": "Class-Based Evaluators",
    "guides/evals/llm-judges": "LLM Judges",
    "guides/evals/using-evaluators-in-logging": "Using Evaluators in Logging",
    "guides/logs/log-an-eval": "Log an Eval",
    "guides/logs/log-batched-evals": "Log Batched Evals",
    "guides/logs/visualize-and-filter": "Visualize and Filter Logs",
    "guides/datasets/upload": "Upload a Dataset",
    "guides/datasets/using": "Using Datasets",
    "guides/datasets/large-datasets": "Working with Large Datasets",
    "guides/datasets/custom": "Generate a Custom Dataset",
    "guides/datasets/off-the-shelf": "Off-the-Shelf Datasets",
    "guides/experiments/run-python": "Run an Experiment (Python)",
    "guides/experiments/run-typescript": "Run an Experiment (TypeScript)",
    "guides/experiments/evaluators": "Using Evaluators in Experiments",
    "guides/experiments/tasks": "Experiment Tasks",
    "guides/experiments/chaining": "Chain Evaluations",
    "guides/experiments/configs": "Experiment Configurations",
    "guides/experiments/visualize": "Visualize Experiments",
    "guides/monitoring/logs": "Monitoring Logs",
    "guides/monitoring/webhooks": "Webhooks for Monitoring",
    "core-workflows/log": "Logging",
    "core-workflows/traces": "Traces",
    "core-workflows/spans": "Spans",
    "core-workflows/sessions": "Sessions",
    "core-workflows/experiment": "Experimentation",
    "core-workflows/test": "Testing",
    "core-workflows/dataset": "Dataset Management",
    "core-workflows/metrics": "Metrics",
    "core-workflows/prompts": "Prompts",
    "core-workflows/annotate": "Annotation",
    "core-workflows/fine-tuning": "Fine-Tuning",
    "cookbooks/use-case/rag": "RAG Use Case",
    "cookbooks/use-case/chat": "Chat Use Case",
    "cookbooks/use-case/agent": "Agent Use Case",
    "cookbooks/workflow/logging": "Logging Workflow",
    "cookbooks/workflow/evaluations": "Evaluations Workflow",
    "cookbooks/workflow/integrations": "Integrations Workflow",
    "sdk-api/functional-api": "Functional API",
    "sdk-api/references": "References",
    "sdk-api/examples": "Examples",
    "references/faqs/errors": "Common Errors",
    "references/faqs/troubleshooting": "Troubleshooting",
    "references/faqs/general": "General",
    "references/release-notes": "Release Notes"
}

# Base directory for the MDX files
base_dir = os.getcwd()

# Function to create or update MDX files
def update_mdx_files():
    for file_path, title: In file_titles.items():
        # Construct full file path
        full_path = os.path.join(base_dir, file_path + ".mdx")
        # Ensure the directory exists
        os.makedirs(os.path.dirname(full_path), exist_ok=True)
        # Write or update the MDX file with frontmatter
        with open(full_path, "w") as file:
            file.write(f"---\n")
            file.write(f"title: {title}\n")
            file.write(f"---\n\n")
            file.write(f"# {title}\n\n")
            file.write("Content goes here.\n")
        print(f"Updated: {full_path}")

# Run the update
update_mdx_files()
