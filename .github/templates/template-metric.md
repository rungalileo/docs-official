---
title: Metric Title in Title Case
description: Description in sentence case
---

import { DefinitionCard } from '@snippets/components/DefinitionCard';
import { MetricWhenToUse } from "/snippets/components/metric-when-to-use.mdx";
import { RelatedResources } from '@snippets/components/related-resources';

> This template includes writing instructions and boilerplate text that you can customize, use as-is, or completely replace with your own text. This text is indicated in (parentheses). Make sure you replace the placeholders with your own text.

## Overview

<DefinitionCard>
	<strong>Title of metric</strong>definition of metric and what it does.
</DefinitionCard>

(This article explains the basics of (metric) and how it works inside of Galileo.)

(Then include a sentence with a definition of the the metric you are explaining)

(Sentence describing when this metric is successful)
- checklist of times when you should see positive scores on metric. 

Typical wordings to use are:
* (X) is;
* (X) represents
* (X) is connected to
* (X) are organized (describe the way how)
* (X) is similar to
* (X) addresses the common pain points of ...
* (X) solves the challenge of ...
* By implementing (X), users can ...
* By using (X), (specify users/target audience) gain ...
* To use (X), you create (Y)

### (Metric) at a glance

| Property | Description |
|:----------|:-------------|
| **Name of Metric** | The official name of the metric |
| **Metric Category** | What category does this metric belong to? |
| **Use this metric for** | When in short should this metric be used? |
| **Can be applied to** | session,trace, all span types (agent, workflow, retriever, LLM, and tool)|
| **LLM/Luna Support** | Whether this metric supports LLM and/or Luna models |
| **Protect Runtime Protection ** | Whether this metric is supported by Galileo Protect |
| **Constants** | Any predefined constants or configuration options |
| **Usage Context** | Where and how this metric can be applied |
| **Value Type** | The data type and allowed values for this metric |
| **Input/Output Requirements** | Required inputs (e.g., ground truth) and expected outputs |

### When to use this metric

<MetricWhenToUse 
  description="(When is this metric best used and why might it be used)"
  useCases={[
    {
      title: "Use case one",
      description: "Describe why this would be helpful for this metric."
    },
    {
      title: "Use case two", 
      description: "Describe why this would be helpful for this metric."
    },
    {
      title: "Use case three",
      description: "Describe why this would be helpful for this metric."
    }
  ]}
/>

## Calculation method

(Sentence on what a not perfect score is caused by)
(Use the Steps component to break down the calculation process:)

<Steps>
  <Step title="Step 1">
    (Description of the first step in the calculation process)
  </Step>
  
  <Step title="Step 2">
    (Description of the second step in the calculation process)
  </Step>
  
  <Step title="Step 3">
    (Description of the final step in the calculation process)
  </Step>
</Steps>

(Include any important notes about the calculation method, such as performance considerations or limitations.)

OPTIONAL
<Note>
  (Any notes on how many LLM calls to compute or estimated cost/performance calculation considerations.)
</Note>

## Score interpretation

**Expected Score:** (perfect score) - (Why is it a perfect score).
	
(UPDATE SCALE COMPONENT BELOW)

<Scale 
  low="0.0" 
  mid="0.5" 
  high="1.0"
  lowLabel="Poor"
  midLabel="Fair" 
  highLabel="Excellent"
  lowDescription="Assistant failed to make any progress toward user goals"
  midDescription="Assistant made some progress but didn't fully address the user's needs"
  highDescription="Assistant successfully advanced user goals with clear progress"
/>

### What different scores mean: 

(Update below with what different scores)

- **0.0 - 0.3 (Poor):** (Explain what poor scores indicate and common causes)
- **0.4 - 0.7 (Fair):** (Explain what fair scores indicate and areas for improvement)
- **0.8 - 1.0 (Excellent):** (Explain what excellent scores indicate and best practices)

## How to improve (metric) scores

(Provide actionable guidance on how to improve scores for this metric.)

### Common issues and solutions:

| Issue | Cause | Solution |
|:-------|:-------|:----------|
| (Common Issue 1) | (Root cause) | (Specific solution with code example if applicable) |
| (Common Issue 2) | (Root cause) | (Specific solution with code example if applicable) |
| (Common Issue 3) | (Root cause) | (Specific solution with code example if applicable) |

### Best practices for optimization:

(List specific best practices with code examples where relevant.)

## Comparison to (other metrics)

(Use this section to compare options or alternatives.)

| Property | (Metric 1 Name) | (Metric 2 Name) | (Metric 3 Name) |
|:----------|:------------------|:------------------|:------------------|
| **Metric Category** | (Category) | (Category) | (Category) |
| **Use this metric for** | (Brief use case description) | (Brief use case description) | (Brief use case description) |
| **Best for** | (Primary use case) | (Primary use case) | (Primary use case) |
| **LLM/Luna Support** | (Yes/No/Partial) | (Yes/No/Partial) | (Yes/No/Partial) |
| **Protect Runtime Protection** | (Yes/No) | (Yes/No) | (Yes/No) |
| **Value Type** | (Data type and range) | (Data type and range) | (Data type and range) |
| **Limitations** | (Key limitations) | (Key limitations) | (Key limitations) |

## Best practices

(Singular sentence on how to implement and optimize (Metric) in your system)

<Note>
  (Important note about using this metric effectively, including any warnings or considerations)
</Note>

### (Best Practice One)
### (Best Practice Two)
### (Best Practice Three)

OPTIONAL
<Note>
(Tip on how to best use with other metrics or other nuance to add in if applicable)
</Note>

> Related Resources Component, feel free to add in any related resources you think are relevant to the metric.
> If there are no related resources / assets, the component will not be rendered if the section is deleted.


<RelatedResources 
  metricName="(Metric Name)"
  howToGuides={[
    { title: "(Title of How to Guide)", url: "(relative path to how to guide)" },
  ]}
  relatedConcepts={[
    { title: "(Concept Doc)", url: "(Relative Path to concept doc)" },
  ]}
  externalResources={[
    { title: "(blog or video could go here)", url: "(link to blog or video)" }
  ]}
/>
