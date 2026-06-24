# DAS (Document Automatic System) - Claude Project Config

## About this project

**DAS** is an MVP web application for automating weekly business reports in hierarchical organizations.

- **Tech Stack**: Next.js (App Router) + TypeScript, Supabase (PostgreSQL), Tailwind CSS, docx.js
- **Timeline**: 3 weeks × 1 hour/day (21 hours total)
- **Goal**: Digital transformation of manual weekly report collection with automatic rollup system

See `final_spec.md` for full spec and `tech.md` for technology research.

## Agent skills

### Issue tracker

Issues live in GitHub Issues. External pull requests are treated as feature requests and triaged alongside issues. See `docs/agents/issue-tracker.md`.

### Triage labels

Uses standard five-label vocabulary: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context layout with `CONTEXT.md` at the root and `docs/adr/` for architecture decisions. See `docs/agents/domain.md`.

## Files and structure

```
.
├── final_spec.md            ← MVP specification (full details)
├── tech.md                  ← Technology stack research & setup guides
├── CONTEXT.md               ← Domain context (create with /init if needed)
├── CLAUDE.md                ← This file
├── docs/
│   └── agents/              ← Agent skill configuration
│       ├── issue-tracker.md
│       ├── triage-labels.md
│       └── domain.md
└── app/                     ← Next.js app (to be created)
```

## Development workflow

1. **Week 1**: Supabase setup + Next.js auth + login form
2. **Week 2**: Team member input form + CRUD operations
3. **Week 3**: Manager selection screen + DOCX report generation

Use `/to-issues` to convert spec items into GitHub issues.
Use `/triage` to process incoming issues and PRs.

## Getting started

1. Create `CONTEXT.md` with project domain overview (run `/init`)
2. Set up GitHub Issues in the document-automatic-system repo
3. Create initial tasks with `/to-issues final_spec.md`
4. Run `/triage` on new issues to label and queue them
