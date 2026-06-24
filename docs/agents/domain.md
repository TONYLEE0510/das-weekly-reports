# Domain Docs

This project uses a **single-context** layout for domain documentation.

## Layout

```
.
├── CONTEXT.md          ← Main domain context
└── docs/adr/           ← Architecture decision records
    ├── 001-auth.md
    ├── 002-db-schema.md
    └── ...
```

## How skills use this

Skills like `improve-codebase-architecture`, `diagnosing-bugs`, and `tdd` read:

1. **`CONTEXT.md`** — to understand the project's domain language, tech stack, and key concepts
2. **`docs/adr/`** — to learn past architectural decisions and constraints

## What goes in CONTEXT.md

- Project overview and purpose
- Core domain concepts (e.g., "a weekly report rollup system")
- Tech stack and key libraries
- Key files and their responsibilities
- Common patterns and conventions

See the example in this repo's root or create a new one with `/init`.

## What goes in docs/adr/

Architecture Decision Records (ADRs) document **why** major decisions were made:

- Database schema design
- Authentication approach
- File organization
- API design
- Library choices

Format: use the standard ADR template (date-title.md).

Example:
```
docs/adr/
├── 2026-06-24-use-supabase-rls.md
├── 2026-06-24-next-app-router.md
└── 2026-06-24-docx-for-reports.md
```

## Future expansion

If this becomes a monorepo, upgrade to multi-context layout:

1. Create `CONTEXT-MAP.md` at the root (lists all contexts)
2. Create per-context `CONTEXT.md` files (e.g., `frontend/CONTEXT.md`, `backend/CONTEXT.md`)
3. Each context gets its own `docs/adr/` folder

No changes needed now — single-context is appropriate for this project.
