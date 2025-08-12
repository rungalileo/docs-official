# {Metric Name}

> If you need more information about how to fill in this template, read the accompanying [guide][./guide_quickstart.md](https://gitlab.com/tgdp/templates/-/blob/main/concept/guide_concept.md).
>
> This template includes writing instructions and boilerplate text that you can customize, use as-is, or completely replace with your own text. This text is indicated in {curly brackets}. Make sure you replace the placeholders with your own text.
>
> This template is based upon the [glossary](https://gitlab.com/tgdp/templates/-/blob/main/glossary/guide_glossary.md) and [concept](https://gitlab.com/tgdp/templates/-/blob/main/concept/guide_concept.md) templates from the [Good Docs Project](https://gitlab.com/tgdp/templates). 
>

## Overview

{This article explains the basics of {metric} and how it works inside of Galileo.}

{Then include a paragraph with a definition of the the metric you are explaining. If more definitions are needed, include those definitions here as a bulleted list.}

Typical wordings to use are:
* {X} is;
* {X} represents
* {X} is connected to
* {X} are organized {describe the way how}
* {X} is similar to
* {X} addresses the common pain points of ...
* {X} solves the challenge of ...
* By implementing {X}, users can ...
* By using {X}, {specify users/target audience} gain ...
* To use {X}, you create {Y}

### {Metric} at a glance

| Property | Description |
|----------|-------------|
| **Name of Metric** | The official name of the metric |
| **Metric Category** | What category does this metric belong to? |
| **Use this metric for** | When in short should this metric be used? |
| **LLM/Luna Support** | Whether this metric supports LLM and/or Luna models |
| **Protect Support** | Whether this metric can be used with Galileo Protect |
| **Constants** | Any predefined constants or configuration options |
| **Usage Context** | Where and how this metric can be applied |
| **Value Type** | The data type and allowed values for this metric |
| **Input/Output Requirements** | Required inputs (e.g., ground truth) and expected outputs |

### What does this {metric} measure?

{Provide a clear, concise definition of what the metric measures. Use the DefinitionCard component if available, if one is not available, create one and add it to the document.}

{Include specific criteria or conditions that must be met for the metric to be calculated properly.}

## Calculation method

{Explain how the metric is calculated, including the mathematical formula or algorithm if applicable.}

{Use the Steps component to break down the calculation process:}

<Steps>
  <Step title="Step 1">
    {Description of the first step in the calculation process}
  </Step>
  
  <Step title="Step 2">
    {Description of the second step in the calculation process}
  </Step>
  
  <Step title="Step 3">
    {Description of the final step in the calculation process}
  </Step>
</Steps>

{Include any important notes about the calculation method, such as performance considerations or limitations.}

## Understanding {metric}

{Use the Card component to explain when and how to use this metric:}

<Card>
  <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem'}}>
    <div style={{fontSize: '1.25rem', color: 'var(--primary-color)'}}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    </div>
    <h3 style={{margin: 0, fontSize: '1.25rem', fontWeight: '600'}}>When to Use This Metric</h3>
  </div>
</Card>

## Use Cases

Use {metric} to {describe the use case}. This is particularly useful when {metric} is used for {describe the use case}.

{Provide specific examples of when to use this metric, including real-world scenarios and applications.}

<Card>
  {Metric name} is particularly valuable for evaluating:

  <div style={{ marginTop: "1rem", paddingTop: "0.75rem", borderTop: "1px solid rgba(209, 213, 219, 0.33)" }}>
    <strong>Use Case 1:</strong> {Description of the first  use case}
  </div>

  <div style={{ marginTop: "0.75rem", paddingTop: "0.75rem", borderTop: "1px solid rgba(209, 213, 219, 0.33)" }}>
    <strong>Use Case 2:</strong> {Description of the second use case}
  </div>

  <div style={{ marginTop: "0.75rem", paddingTop: "0.75rem", borderTop: "1px solid rgba(209, 213, 219, 0.33)" }}>
    <strong>Use Case 3:</strong> {Description of the third  use case}
  </div>

  <div style={{ marginTop: "1rem", paddingTop: "0.75rem", borderTop: "1px solid rgba(209, 213, 219, 0.33)" }}>
    {Summary of how this metric helps users achieve their goals}
  </div>
</Card>

## Examples

### Example 1: {Scenario Name}

{Provide a concrete example with sample data and expected results.}

{ Python code example showing how the metrics is used with inputs and outputs }
{ TypeScript code example showing how the metrics is used with inputs and outputs }

**Expected Score:** {Expected score range and explanation}

### Example 2: {Another Scenario}

{Provide another example with different context or conditions.}

## Score Interpretation

{Use the scale component to show score ranges and their meanings:}

<Scale 
  low="0.0" 
  mid="0.5" 
  high="1.0"
  lowLabel="Poor"
  midLabel="Fair" 
  highLabel="Excellent"
  lowDescription="Indicates significant issues that need immediate attention"
  midDescription="Shows room for improvement but meets basic requirements"
  highDescription="Demonstrates excellent performance and best practices"
/>

### What different scores mean:

- **0.0 - 0.3 (Poor):** {Explain what poor scores indicate and common causes}
- **0.4 - 0.7 (Fair):** {Explain what fair scores indicate and areas for improvement}
- **0.8 - 1.0 (Excellent):** {Explain what excellent scores indicate and best practices}

## How to improve {metric} scores

{Provide actionable guidance on how to improve scores for this metric.}

### Common issues and solutions:

| Issue | Cause | Solution |
|-------|-------|----------|
| {Common Issue 1} | {Root cause} | {Specific solution with code example if applicable} |
| {Common Issue 2} | {Root cause} | {Specific solution with code example if applicable} |
| {Common Issue 3} | {Root cause} | {Specific solution with code example if applicable} |

### Best practices for optimization:

{List specific best practices with code examples where relevant.}

## Comparison to {other metrics}

{Use this section to compare options or alternatives.}

| Property | {Metric 1 Name} | {Metric 2 Name} | {Metric 3 Name} |
|----------|------------------|------------------|------------------|
| **Metric Category** | {Category} | {Category} | {Category} |
| **Use this metric for** | {Brief use case description} | {Brief use case description} | {Brief use case description} |
| **Best for** | {Primary use case} | {Primary use case} | {Primary use case} |
| **LLM/Luna Support** | {Yes/No/Partial} | {Yes/No/Partial} | {Yes/No/Partial} |
| **Protect Support** | {Yes/No} | {Yes/No} | {Yes/No} |
| **Value Type** | {Data type and range} | {Data type and range} | {Data type and range} |
| **Limitations** | {Key limitations} | {Key limitations} | {Key limitations} |

## Best practices

<CardGroup cols={2}>
  <Card title="Practice 1" icon="chart-line">
    {Description of the first best practice with actionable guidance}
  </Card>

  <Card title="Practice 2" icon="magnifying-glass">
    {Description of the second best practice with actionable guidance}
  </Card>

  <Card title="Practice 3" icon="scale-balanced">
    {Description of the third best practice with actionable guidance}
  </Card>

  <Card title="Practice 4" icon="code-branch">
    {Description of the fourth best practice with actionable guidance}
  </Card>
</CardGroup>

<Note>
  {Important note about using this metric effectively, including any warnings or considerations}
</Note>

## Implementation

### Basic implementation

{ Python code example (no custom elements or additional arguments/parameters) of how to use the metric }
{ TypeScript code example  (no custom elements or additional arguments/parameters)of how to use the metric }

### Advanced configuration

{ Python code example (with custom metric elements or additional arguments/parameters) of how to use the metric }
{ TypeScript code example (with custom metric elements or additional arguments/parameters) of how to use the metric }

## Related Resources

If you would like to dive deeper or start implementing {metric}, check out the following resources:

### How-to guides:
- [Link to relevant how-to guide 1]
- [Link to relevant how-to guide 2]

### Related Concepts:
- [Link to related concept 1]
- [Link to related concept 2]

### External Resources:
- [Link to external resource 1]
- [Link to external resource 2]

> Explore other templates from [The Good Docs Project](https://thegooddocsproject.dev/). Use our [feedback form](https://thegooddocsproject.dev/feedback/?template=Concept%20template) to give feedback on this template.

