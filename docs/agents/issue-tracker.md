# Issue Tracker

Issues for this project live in **GitHub Issues**. External pull requests are treated as feature requests and triaged alongside issues.

## How skills use this

- `to-issues` reads this to decide whether to call `gh issue create` or write a local markdown file
- `triage` uses this to understand where to apply labels
- `to-prd` and other skills read issue details from here

## Workflow

1. Issues and PRs arrive in GitHub Issues
2. `/triage` processes them and applies labels
3. Issues labeled `ready-for-agent` can be picked up by Claude agents
4. Issues labeled `ready-for-human` are queued for human work

## External PRs

External pull requests (from outside collaborators) are triaged as feature requests. They enter the same queue as issues and receive the same label treatment.

Collaborators' in-flight PRs are left alone.

## Setup required

- `gh` CLI installed and authenticated (`gh auth status`)
- Repository is accessible via GitHub

No additional setup needed beyond `gh` configuration.
