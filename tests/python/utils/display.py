"""
Display Utilities

This module provides reusable functions for displaying metrics and results
in a formatted way using the rich library.
"""

from rich.console import Console
from rich.table import Table
from rich.panel import Panel

# Initialize rich console
console = Console()

def display_metrics(metrics):
    """
    Display metrics in a formatted way

    Args:
        metrics: The metrics data (dict or list)
    """
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

def extract_metric_value(metrics, metric_name="instruction_adherence"):
    """
    Extract a specific metric value from metrics data

    Args:
        metrics: The metrics data (dict or list)
        metric_name: The name of the metric to extract

    Returns:
        The metric value or None if not found
    """
    if not metrics:
        return None

    # Extract from metrics based on format
    if isinstance(metrics, list):
        for metric in metrics:
            if isinstance(metric, dict) and metric.get('name') == metric_name:
                return metric.get('score')
    elif isinstance(metrics, dict):
        if metric_name in metrics:
            if isinstance(metrics[metric_name], dict):
                return metrics[metric_name].get('score')
            else:
                return metrics[metric_name]

    return None

def compare_metrics(original_metrics, improved_metrics, metric_name="instruction_adherence"):
    """
    Compare metrics between original and improved versions

    Args:
        original_metrics: The metrics from the original version
        improved_metrics: The metrics from the improved version
        metric_name: The name of the metric to compare
    """
    console.print("\n[bold cyan]Metric Comparison[/]")

    # Extract metric values
    original_value = extract_metric_value(original_metrics, metric_name)
    improved_value = extract_metric_value(improved_metrics, metric_name)

    if original_value is None or improved_value is None:
        console.print(f"[bold yellow]⚠ Cannot compare {metric_name} - one or both metrics are missing[/]")
        return

    # Calculate the improvement percentage
    improvement = ((improved_value - original_value) / original_value) * 100 if original_value > 0 else float('inf')

    # Create a comparison table
    table = Table(title=f"{metric_name.replace('_', ' ').title()} Comparison", show_header=True, header_style="bold cyan")
    table.add_column("Version", style="cyan")
    table.add_column("Score", style="cyan")
    table.add_column("Bar Chart", style="cyan", no_wrap=True)

    # Calculate bar lengths for visualization
    max_value = max(original_value, improved_value)
    original_bar_length = int((original_value / max_value) * 20) if max_value > 0 else 0
    improved_bar_length = int((improved_value / max_value) * 20) if max_value > 0 else 0

    # Add rows to the table
    table.add_row(
        "Original",
        f"{original_value:.4f}",
        f"[yellow]{'█' * original_bar_length}[/]{'░' * (20 - original_bar_length)}"
    )
    table.add_row(
        "Improved",
        f"{improved_value:.4f}",
        f"[green]{'█' * improved_bar_length}[/]{'░' * (20 - improved_bar_length)}"
    )

    console.print(table)

    # Print improvement summary
    if improved_value > original_value:
        console.print(f"[bold green]✓ Improvement: +{improvement:.2f}%[/]")
        console.print(Panel(f"[bold green]The improved version has better {metric_name.replace('_', ' ')}! 🎉[/]", border_style="green"))
    elif improved_value == original_value:
        console.print(f"[bold yellow]⚠ No change in {metric_name.replace('_', ' ')}.[/]")
    else:
        console.print(f"[bold red]✗ Decrease: {improvement:.2f}%[/]")
        console.print(Panel(f"[bold red]The improved version has worse {metric_name.replace('_', ' ')}.[/]", border_style="red"))

def display_word_count(content, max_words=None):
    """
    Display word count and check if it's within the limit

    Args:
        content: The text content to count words in
        max_words: The maximum number of words allowed (optional)

    Returns:
        The word count
    """
    if not content:
        console.print("[bold yellow]⚠ No content to count words in[/]")
        return 0

    word_count = len(content.split())
    console.print(f"\n[bold cyan]Word Count:[/] {word_count}")

    if max_words is not None:
        if word_count <= max_words:
            console.print(f"[bold green]✓ Response contains {word_count} words (within the {max_words}-word limit)[/]")
        else:
            console.print(f"[bold yellow]⚠ Response contains {word_count} words (exceeds the {max_words}-word limit)[/]")

    return word_count
