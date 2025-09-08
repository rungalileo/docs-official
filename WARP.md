# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Repository Overview

This is the Galileo documentation repository built with [Mintlify](https://mintlify.com/) that generates the official documentation site at [v2docs.galileo.ai](https://v2docs.galileo.ai/). The docs follow the [Diátaxis framework](https://diataxis.fr) with four distinct content types: tutorials/cookbooks, how-to guides, technical reference, and explanations/concepts.

## Documentation Architecture

The documentation is structured as follows:

```
├── docs.json                 # Mintlify configuration and navigation structure
├── getting-started/          # Quickstarts and onboarding content
├── how-to-guides/           # Task-oriented instructional guides
├── cookbooks/               # End-to-end tutorials for real-world scenarios
├── concepts/                # Explanatory content and background information
├── sdk-api/                 # SDK and API reference documentation
├── references/              # Other reference materials
├── snippets/                # Reusable code snippets organized by language
│   ├── code/               # Language-specific code examples
│   ├── content/            # Content snippets
│   └── components/         # Component snippets
└── images/                  # Documentation images and media
```

The `docs.json` file is the central configuration that maps file structure to the navigational hierarchy and contains important settings like redirects, integrations, and theme configuration.

## Development Commands

### Environment Setup
```bash
# Install Node.js dependencies
npm install

# Install Mintlify CLI globally
npm install -g mint

# For development container (VS Code)
# The devcontainer will automatically install Vale and mdx2vast
```

### Documentation Development
```bash
# Start local development server
mint dev
# or
npm run dev

# Build documentation
mint build
# or  
npm run build

# Check for broken links
mint broken-links

# Generate API reference (when needed)
npx --yes @mintlify/scraping@latest openapi-file https://api.galileo.ai/public/v2/openapi.json -o api-reference
```

### Content Quality Checks
```bash
# Install Vale for spell checking
brew install vale

# Install MDX2VAST for markdown processing
npm install -g mdx2vast

# Run spell check (excludes generated SDK docs)
vale . --glob='!{sdk-api/**/reference/**/*.*}'

# Run pre-commit hooks
pre-commit run --all-files
```

## Content Guidelines

### Documentation Types

1. **Cookbooks** (Tutorials): End-to-end learning experiences for real-world scenarios
   - Located in `/cookbooks/`
   - Must include working code examples in [sdk-examples repo](https://github.com/rungalileo/sdk-examples)
   - Should include video walkthroughs
   - Use front matter tags: `tag: "Python"` or `tag: "TypeScript"`

2. **How-to Guides**: Task-oriented problem-solving guides
   - Located in `/how-to-guides/`  
   - Support all relevant programming languages unless language-specific
   - Focus on specific tasks or problems

3. **Concepts**: Explanatory content providing context and background
   - Located in `/concepts/`
   - Explain the "why" behind features and functionality
   - Include overviews and deeper conceptual information

4. **SDK/API Reference**: Technical reference material
   - Located in `/sdk-api/`
   - Mix of auto-generated and manually curated content
   - Separate sections for Python SDK, TypeScript SDK, and REST API

### Code Snippet Management

All code examples should be created as reusable snippets in the `/snippets/` directory:

```javascript
// Import snippets in documentation
import SnippetInstallPython from "/snippets/code/python/how-to-guides/basics/basic-example/install-packages.mdx";

// Use in CodeGroup component for multi-language support  
<CodeGroup>
  <SnippetInstallPython />
</CodeGroup>
```

### Writing Standards

- Use active, instructional voice ("Create a new page" not "Creating a new page")
- Use gender-neutral and inclusive language
- Provide descriptive alt text for all images
- Keep code blocks under 85 columns to avoid horizontal scrolling
- Use title case for document titles in front matter, sentence case for headings
- Always use root-relative links, never docs URLs
- Include proper redirects in `docs.json` when moving pages

### Front Matter Requirements

```yaml
---
title: "Clear and Concise Title"
description: "SEO-optimized description used on page and in search results"
tag: "Python"  # For cookbooks only
---
```

## Pull Request Process

### Small Changes (spelling, minor formatting)
- Create PR directly, no issue needed
- Use pull request template checklist

### Large Changes (new pages, major rewrites, cookbooks)
- **Galileo employees**: Create Shortcut ticket (team: devrel, workflow: engineering, area: docs)
- **External contributors**: Create GitHub issue first
- Large PRs without corresponding tickets will be closed

### PR Checklist Requirements
- [ ] Changes deployed to staging successfully
- [ ] Reviewed final changes and deployed version  
- [ ] Tested all code snippets
- [ ] Verified images/videos are clear and readable
- [ ] All CI checks pass (broken links, spelling, formatting)
- [ ] References only public features (or scheduled for feature release)

## Mintlify Configuration

Key configuration areas in `docs.json`:

- **Navigation**: Complex nested structure mapping files to site navigation
- **Redirects**: Critical for SEO when moving/renaming pages
- **Integrations**: Analytics (GA4, GTM, PostHog)
- **Theme**: Colors, logos, styling
- **API Reference**: Auto-generated from OpenAPI spec

## Integration Development

When documenting integrations with third-party platforms:

1. **SDK Integration**: Document in `/sdk-api/third-party-integrations/`
2. **Sample Project**: Create in [sdk-examples repo](https://github.com/rungalileo/sdk-examples)
3. **Cookbook**: Create tutorial with step-by-step guide  
4. **Video Walkthrough**: Record demo for visual learners

## Development Container Support

The repository includes a devcontainer configuration with:
- Python 3.12 base environment
- Node.js LTS with npm, yarn, pnpm
- Auto-installation of Vale, Mintlify CLI, and mdx2vast
- VS Code extensions for MDX, YAML, GitHub Actions, and spell checking

## Troubleshooting

### Common Issues

**Broken Links**: Run `mint broken-links` locally. For links to generated API docs, first generate them with the OpenAPI scraping command.

**Spelling Errors**: Add accepted words to `.vale/styles/config/vocabularies/Galileo-Vocab/accept.txt` in alphabetical order. Use `[W,w]ord` syntax for case variations.

**Code Snippets**: Ensure snippets are properly imported and wrapped in `<CodeGroup>` components. Use consistent naming conventions across languages.

**Navigation Issues**: Verify `docs.json` structure matches file paths. Restart dev server after navigation changes.

### File Locations

- Templates: `.github/templates/`
- Vale configuration: `.vale.ini` and `.vale/styles/`
- Pre-commit hooks: `.pre-commit-config.yaml`
- Dev container: `.devcontainer/devcontainer.json`

## Additional Resources

- [Mintlify Documentation](https://mintlify.com/docs/)
- [Diátaxis Framework](https://diataxis.fr)
- [Contributing Guide](.github/CONTRIBUTING.md)
- [The Good Docs Project Templates](https://www.thegooddocsproject.dev)
- [SDK Examples Repository](https://github.com/rungalileo/sdk-examples)
