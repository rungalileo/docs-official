# Galileo Docs

This repo is the source for [Galileo's docs](https://v2docs.galileo.ai/). We use [Mintlify](https://mintlify.com/) for building and publishing our docs.

## Contributing

1. Clone the repo (or open in GitHub Codespaces).
2. Install `pre-commit` hooks to run before every `git push`: `pre-commit install --hook-type pre-push`. (You might need to do `brew install pre-commit` if you don't have `pre-commit` installed.)
3. Create a branch.
4. Make edits. This is a [good guide](https://docs.google.com/document/d/1NdxuFY4kzF-gSuco0HDuk0Qydct0Y0YrhJrjz6Itcvg/edit) to follow as you're making these changes.
5. Create a PR.
6. Merge PR after it is approved.
7. See ✨ on https://docs.rungalileo.io/.

## Local Development

If you want to validate your changes locally before pushing them up, you can do that with the `mintlify` CLI.

1. Install the [Mintlify CLI](https://www.npmjs.com/package/mintlify): `npm i -g mintlify`
2. Run `mintlify dev` from the root of the repo.

It'll watch for updates and keep auto-refreshing as long as the command is running.

### Troubleshooting

- Mintlify dev isn't running: Run `mintlify install` it'll re-install dependencies.
- Page loads as a 404: Make sure you are running in a folder with `mint.json`
- New page not showing in directory: Add the page to `mint.json`.
- `prettier` pre-commit check can fail sometimes repeatedly. This can happen because `prettier` [doesn't yet know how to handle MDX3](https://github.com/prettier/prettier/issues/12209) format. Workaround is to ensure we add an extra line before close tags.

```
# If your DOM looks like this
<Steps>
<Step>
Step 1
</Step>
<Step>
</Step>
</Steps>

# Structure it with an extra empty line before end tags instead.
<Steps>
<Step>
Step 1

</Step>
<Step>

</Step>

</Steps>
```
