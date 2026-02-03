# AGENTS.md - Galileo Documentation Project Guide

This document provides guidance for AI coding assistants working on the Galileo documentation project.

## Project Overview

This is a **Mintlify-based documentation site** for Galileo, an AI observability and evaluation platform. The documentation is written in MDX (Markdown with JSX) and published to [docs.galileo.ai](https://docs.galileo.ai/).

**Galileo** helps teams monitor, evaluate, and improve their LLM applications through logging, metrics, experiments, and guardrails (Protect).

### Key Technologies

- **Mintlify**: Documentation platform and build system
- **MDX**: Markdown with JSX component support
- **Vale**: Spell checking (configured in `.vale.ini`)

### Local Development

```bash
npm install -g mint
mint dev              # Start local dev server
mint broken-links     # Check for broken links before pushing
```

## Directory Structure

```text
docs-official/
├── docs.json                 # Main site configuration and navigation
├── api/                      # API reference documentation
├── concepts/                 # Conceptual/explanatory documentation
│   ├── annotations/
│   ├── experiments/
│   ├── logging/
│   ├── luna/
│   ├── metrics/
│   └── protect/
├── cookbooks/                # Tutorial-style guides and recipes
│   ├── features/
│   └── use-cases/
├── getting-started/          # Quickstart and onboarding guides
│   ├── evaluate-and-improve/
│   ├── experiments/
│   ├── mcp/
│   └── sample-projects/
├── how-to-guides/            # Task-oriented how-to documentation
│   ├── agentic-ai/
│   ├── basics/
│   ├── conversational-ai/
│   ├── experiments/
│   ├── luna/
│   ├── metrics/
│   ├── protect/
│   ├── rag/
│   └── third-party-integrations/
├── learn/                    # Educational content
├── references/               # FAQs, troubleshooting, error docs
│   └── faqs/
├── sdk-api/                  # SDK and API documentation
│   ├── logging/
│   ├── experiments/
│   ├── metrics/
│   ├── protect/
│   ├── python/reference/     # Auto-generated Python SDK reference
│   ├── typescript/reference/ # Auto-generated TypeScript SDK reference
│   └── third-party-integrations/
├── security/                 # Security-related docs (SSO, etc.)
├── snippets/                 # Reusable content snippets
│   ├── code/                 # Code snippets (see Code Snippets section)
│   ├── components/           # JSX components and MDX snippets (see below)
│   ├── content/              # Reusable content blocks (see below)
│   └── product/              # Console empty-state content (do not delete)
├── images/                   # Static images
│   ├── concepts/
│   ├── console-ui/
│   ├── howto/
│   ├── integrations/
│   └── release-notes/
└── logo/                     # Logo assets
```

**Note:** Files under `sdk-api/python/reference/` and `sdk-api/typescript/reference/` are auto-generated and should not be manually edited.

## Page Navigation (`docs.json`)

The `docs.json` file controls site configuration, navigation, and page hierarchy.

### Structure

```json
{
  "navigation": {
    "tabs": [
      {
        "tab": "Documentation",
        "icon": "book-open",
        "groups": [
          {
            "group": "Group Name",
            "pages": [
              "path/to/page",
              {
                "group": "Nested Group",
                "pages": ["path/to/nested-page"]
              }
            ]
          }
        ]
      }
    ]
  }
}
```

### Key Rules

1. **Page paths do not include the `.mdx` extension**
2. **Paths are relative to the project root**
3. **Groups can be nested** for sub-navigation
4. **Each tab** represents a main section (Documentation, SDK/API Reference, Cookbooks, etc.)

### Adding a New Page

1. Create the `.mdx` file in the appropriate directory
2. Add the page path to `docs.json` in the correct group
3. Run `mint broken-links` to verify

## Code Snippets

Code snippets are stored separately from documentation pages for reusability across multiple pages.

### Snippet Location

```text
snippets/code/{language}/{category}/{feature}/{snippet-name}.mdx
```

**Languages:**

- `python/` - Python code examples
- `typescript/` - TypeScript code examples
- `multilingual/` - Language-agnostic or environment snippets (e.g., env vars)
- `mcp/` - MCP configuration snippets
- `text/` - Plain text snippets (CLI output, logs, etc.)

**Example paths:**

```text
snippets/code/python/sdk/wrappers/crewai.mdx
snippets/code/typescript/sdk/logging/add-llm-span.mdx
snippets/code/multilingual/env-galileo.mdx
```

### Snippet File Format

Snippets are MDX files containing fenced code blocks with a language label:

````markdown
```python Python
from galileo import GalileoLogger

logger = GalileoLogger()
logger.start_trace(input="Hello")
```
````

The label after the language (e.g., `Python`) appears as the tab name when used in a `<CodeGroup>`.

### Using Snippets in Documentation

**1. Import the snippet at the top of the MDX file:**

```jsx
import SnippetName from "/snippets/code/python/sdk/wrappers/crewai.mdx";
```

**2. Use the snippet in the document:**

```jsx
<CodeGroup>
  <SnippetName />
</CodeGroup>
```

**Multiple language example:**

```jsx
import SnippetPython from "/snippets/code/python/sdk/logging/example.mdx";
import SnippetTypeScript from "/snippets/code/typescript/sdk/logging/example.mdx";

<CodeGroup>
  <SnippetPython />
  <SnippetTypeScript />
</CodeGroup>
```

### When to Create Snippets

- Code that appears in multiple documentation pages
- Code examples that may need coordinated updates
- Multi-language examples (Python + TypeScript)

For single-use code examples, inline code blocks are acceptable.

### Component Snippets (`snippets/components/`)

Contains reusable JSX components and MDX snippets for complex UI elements:

- `MetricsTable.jsx` - Interactive metrics reference table
- `LLMFrameworkSelector.jsx` - Framework selection component
- Various `.mdx` files for reusable metric descriptions and UI patterns

**Usage:**

```jsx
import MetricsTable from "/snippets/components/MetricsTable.jsx";

<MetricsTable />
```

### Content Snippets (`snippets/content/`)

Contains reusable content blocks for common documentation patterns:

- OpenTelemetry configuration instructions
- Dependency installation steps
- Getting started content blocks

**Example paths:**

```text
snippets/content/configure-otel-env-vars.mdx
snippets/content/install-dependencies-openai.mdx
snippets/content/get-started/
```

### Product Snippets (`snippets/product/`)

**Do not modify or delete these files.** They are used by the Galileo console to render empty states for product pages. A GitHub Action verifies these files exist.

## MDX File Format

### Frontmatter

Every `.mdx` file requires YAML frontmatter:

```yaml
---
title: Page Title
description: Brief description of the page content
---
```

**Required fields:**

- `title` - Page title displayed in navigation and browser tab
- `description` - Brief description for SEO and page headers

**Optional fields:**

- `tag` - Language/technology badge displayed on the page (e.g., `"Python"`, `"Python, TypeScript"`)
- `icon` - Custom icon for navigation (e.g., `"house"`, `"paper-plane"`)

### Common Components

**CodeGroup** - Tabbed code blocks:

```jsx
<CodeGroup>
  <SnippetPython />
  <SnippetTypeScript />
</CodeGroup>
```

**CardGroup** - Grid of navigation cards:

```jsx
<CardGroup cols={2}>
  <Card title="Card Title" icon="code" horizontal href="/concepts/metrics/overview">
    Card description text.
  </Card>
</CardGroup>
```

**Card** - Navigation card:

```jsx
<Card title="Title" icon="python" href="/sdk-api/overview">
  Description of where this links to.
</Card>
```

The `horizontal` attribute is optional and changes the card layout.

**Tabs** - Content tabs (alternative to CodeGroup for non-code content):

```jsx
<Tabs>
  <Tab title="Python">
    Python-specific content here.
  </Tab>
  <Tab title="TypeScript">
    TypeScript-specific content here.
  </Tab>
</Tabs>
```

**Note/Warning/Info callouts:**

```jsx
<Note>This is a note callout.</Note>
<Warning>This is a warning callout.</Warning>
<Info>This is an info callout.</Info>
```

## Conventions

### File Naming

- Use kebab-case for file and directory names: `my-new-page.mdx`
- Match the URL structure you want: `how-to-guides/basics/basic-example.mdx` → `/how-to-guides/basics/basic-example`

### Content Organization

- **concepts/**: Explain what something is and why it matters
- **how-to-guides/**: Step-by-step task completion
- **sdk-api/**: Reference documentation for SDK features
- **cookbooks/**: End-to-end tutorials and recipes

### Internal Links

Use absolute paths from the project root without the `.mdx` extension:

```markdown
See the [logging guide](/sdk-api/logging/galileo-logger) for more details.
```

### Images

Store images in `images/` organized by category:

- `images/concepts/` - Conceptual diagrams
- `images/console-ui/` - Console UI screenshots
- `images/howto/` - How-to guide images
- `images/integrations/` - Integration logos and diagrams
- `images/release-notes/` - Release announcement images

Reference them with absolute paths:

```markdown
![Alt text](/images/console-ui/my-screenshot.png)
```

## Spell Checking

Run Vale to check spelling (excludes auto-generated SDK reference):

```bash
vale . --glob='!{sdk-api/**/reference/**/*.*}'
```

Custom vocabulary is defined in `.vale/styles/config/vocabularies/Galileo-Vocab/accept.txt`.

## Markdown Linting

Run markdownlint to check markdown formatting:

```bash
npx markdownlint-cli2 "**/*.md" "**/*.mdx"
```

To lint specific files:

```bash
npx markdownlint-cli2 path/to/file.mdx
```

Configuration is in `.markdownlint-cli2.jsonc`. Common issues include:

- Missing language specifier on code blocks (use `text` for plain text, `jsx` for components)
- Missing blank lines around lists and code blocks
- Bare URLs (use `[text](url)` format instead)

## Redirects

URL redirects are configured in `docs.json` under the `redirects` array:

```json
{
  "redirects": [
    { "source": "/old/path", "destination": "/new/path" }
  ]
}
```

Add redirects when moving or renaming pages to preserve existing links.

## Do Not

- **Edit auto-generated files** under `sdk-api/python/reference/` or `sdk-api/typescript/reference/`
- **Delete files** in `snippets/product/` (used by console, verified by CI)
- **Remove pages** from `docs.json` without adding redirects for existing links
- **Use relative paths** for internal links (always use absolute paths from root)
- **Omit frontmatter** (`title`, `description`) in new MDX files
- **Add pages** without updating `docs.json` navigation

## Pre-commit Checklist

Before pushing changes:

1. **Check for broken links:**

   ```bash
   mint broken-links
   ```

2. **Run spell check** (excludes auto-generated SDK reference):

   ```bash
   vale . --glob='!{sdk-api/**/reference/**/*.*}'
   ```

3. **Run markdown lint:**

   ```bash
   npx markdownlint-cli2 "**/*.md" "**/*.mdx"
   ```

4. **Verify new pages** are added to `docs.json` in the correct navigation group

5. **Test locally:**

   ```bash
   mint dev
   ```

6. **Add redirects** if renaming or moving existing pages
