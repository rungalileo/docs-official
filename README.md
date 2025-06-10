# Galileo Docs

This repo is the source for [Galileo's docs](https://v2docs.galileo.ai/).  We use [Mintlify](https://mintlify.com/) for building and publishing our docs.

## Contributing

See our [contributing guide](./.github/CONTRIBUTING.md) for more details.

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
