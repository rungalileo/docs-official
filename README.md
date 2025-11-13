# Galileo Docs

This repo is the source for [Galileo's docs](https://v2docs.galileo.ai/). We use [Mintlify](https://mintlify.com/) for building and publishing our docs.

## ✨ Enhanced Features

Our documentation includes several UX enhancements to improve your reading and navigation experience:

### Keyboard Shortcuts
- **Cmd/Ctrl + K**: Quick access to search
- **Tab**: Navigate interactive elements
- **Enter**: Expand/collapse sections

### Interactive Features
- **Sticky Table of Contents**: Automatically highlights your current section with scroll progress indicator
- **Reading Time Estimates**: See estimated reading time at the top of each page
- **Enhanced Code Blocks**: One-click copy with language detection and visual feedback
- **Collapsible Sections**: Expand/collapse content sections for better focus
- **Smart Breadcrumbs**: Contextual "next steps" suggestions based on your current page
- **Print-Optimized**: Clean, professional formatting when printing documentation

### Accessibility
- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader optimized
- High contrast focus indicators

## Contributing

See our [contributing guide](./.github/CONTRIBUTING.md) for more details.

### Documentation Style Guide

Before contributing, please review our [Documentation Style Guide](./DOCUMENTATION_STYLE_GUIDE.md) which covers:
- Writing style and tone guidelines
- Markdown formatting standards
- Code example best practices
- Mintlify component usage
- Quality checklist

### CI/CD Pipeline

All pull requests automatically run through our comprehensive CI/CD pipeline:
- **Markdown Linting**: Ensures consistent formatting and style
- **Link Validation**: Checks all internal and external links
- **Performance Testing**: Lighthouse CI with 90+ score requirement
- **Build Verification**: Confirms Mintlify builds successfully
- **Preview Deployment**: Generates preview URLs for review

See [`.github/workflows/docs-ci.yml`](./.github/workflows/docs-ci.yml) for pipeline details.

## Dev container

This repo has a devcontainer configured so you can run in VS Code with the dev containers extension and Docker, or in a code space, and have an isolated environment with all the relevant tools installed.

This container installs the Mintlify CLI as well as Vale for spellchecking. It also has some recommended extensions. If you find any other extensions useful, please add thm to the `devcontainer.json` file.

## Build and view the docs

We use [Mintlify](https://mintlify.com/) for building and publishing our docs.

To build and run the doc locally:

1. Install the [Mintlify](https://mintlify.com/) CLI:

    ```bash
    npm install -g mint
    ```

1. Run the Mintlify CLI:

    ```bash
    mint dev
    ```

## Check for broken links

Before pushing a change, check for broken links using:

```bash
mint broken-links
```

## Check spellings

This repo is set up to use Vale to check spellings. To use it, first [install Vale](https://vale.sh/docs/install):

```bash
brew install vale
```

Then install MDX2VAST:

```bash
npm install -g mdx2vast
```

Then you can check spelling using:

```bash
vale . --glob='!{sdk-api/**/reference/**/*.*}'
```

This command ignores the generated SDK code.

## Linting and Pre-commit Hooks

This repository uses pre-commit hooks to maintain code quality:

```bash
# Install pre-commit hooks
pre-commit install

# Run markdown linting
npm run lint:markdown

# Auto-fix markdown issues
npm run lint:markdown:fix
```

## Project Documentation

- [Documentation Style Guide](./DOCUMENTATION_STYLE_GUIDE.md) - Comprehensive writing and formatting standards
- [Phase 1 Implementation Summary](./PHASE_1_IMPLEMENTATION_SUMMARY.md) - Technical details of UX enhancements
- [Enhancement Roadmap](./documentation-enhancement-roadmap.md) - 36-week improvement plan
- [Improvement Recommendations](./documentation-improvement-recommendations.md) - Selected enhancements
