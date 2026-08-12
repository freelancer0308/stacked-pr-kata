# Stacked PR Kata

A tiny, safe exercise for learning [GitHub stacked pull requests](https://docs.github.com/en/pull-requests/how-tos/stacked-pull-requests).

Start with the [three-minute introduction](https://freelancer0308.github.io/stacked-pr-kata/), then use this repository to try the workflow yourself.

In about 10 minutes, you will create three draft pull requests that form one stack:

```text
PR 3  Docs
  ↓
PR 2  Adapter implementation
  ↓
PR 1  Platform config
  ↓
main
```

The changes use fictional data under your own directory. Nothing calls an external service.

## 1. Prerequisites

- Git 2.20+
- GitHub CLI 2.90+
- Push access to this repository

```bash
gh auth status
gh extension install github/gh-stack
```

Clone the repository and start from the `init` branch:

```bash
gh repo clone freelancer0308/stacked-pr-kata
cd stacked-pr-kata
git switch init
```

The repository uses three permanent branches:

- `main` — the trunk that kata pull requests target
- `init` — the clean starting point
- `final` — a completed reference with one commit per layer

Use your GitHub login as a namespace so multiple people can run the kata at the same time:

```bash
LOGIN=$(gh api user --jq .login)
mkdir -p "exercises/$LOGIN"
```

## 2. PR 1 — Platform config

Initialize the bottom branch:

```bash
gh stack init --base main "kata/$LOGIN/01-config"
cp templates/platform.json "exercises/$LOGIN/platform.json"
```

Replace `YOUR_LOGIN` in the copied file, then commit:

```bash
git add "exercises/$LOGIN/platform.json"
git commit -m "kata: add $LOGIN platform config"
```

## 3. PR 2 — Adapter implementation

Create the next layer from the current branch:

```bash
gh stack add "kata/$LOGIN/02-adapter"
cp templates/adapter.mjs "exercises/$LOGIN/adapter.mjs"
git add "exercises/$LOGIN/adapter.mjs"
git commit -m "kata: add $LOGIN search adapter"
```

## 4. PR 3 — Documentation

Create the top layer:

```bash
gh stack add "kata/$LOGIN/03-docs"
cp templates/README.md "exercises/$LOGIN/README.md"
git add "exercises/$LOGIN/README.md"
git commit -m "kata: document $LOGIN adapter"
```

## 5. Submit the stack

Run the local check, then create all three pull requests:

```bash
npm test
gh stack submit --auto
gh stack view
```

`--auto` creates new pull requests as drafts by default. On GitHub, verify that:

1. The stack map shows all three pull requests in order.
2. Each pull request shows only the diff for its own layer.
3. The `check` workflow runs for every layer, even though the workflow only declares `main` as its pull request branch.

## 6. Try a review change

Ask a partner to review the bottom PR and request `maxResults` be changed from `100` to `50`.

Apply the change from the bottom branch and synchronize the stack:

```bash
gh stack bottom
# edit exercises/$LOGIN/platform.json
git add "exercises/$LOGIN/platform.json"
git commit -m "kata: lower $LOGIN max results"
gh stack sync
gh stack view
```

Observe that the upper branches are rebased and their checks run again.

## Reference solution

The `final` branch contains the expected files and three commits in the same bottom-to-top order:

```bash
git log --oneline init..final
git diff init..final
```

## Done

You have practiced the two ideas that matter most:

- **Developer:** continue dependent work without waiting for the previous PR to merge.
- **Reviewer:** review small diffs in an explicit bottom-to-top order.

Do not merge kata pull requests. Close your three drafts when you are finished; branch deletion and cleanup are intentionally left as explicit human actions.
