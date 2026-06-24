# Triage Labels

The `triage` skill applies these labels to issues and PRs to move them through a state machine.

## Label mapping

| Canonical role | Label in this repo |
|---|---|
| needs-triage | `needs-triage` |
| needs-info | `needs-info` |
| ready-for-agent | `ready-for-agent` |
| ready-for-human | `ready-for-human` |
| wontfix | `wontfix` |

## State machine

1. **Triage incoming** — issue arrives, receives `needs-triage`
2. **Needs clarification?** — if yes, apply `needs-info` (waiting on reporter)
3. **Ready for work** — apply either:
   - `ready-for-agent` if fully specified (Claude can pick it up)
   - `ready-for-human` if it needs human implementation
4. **Rejected** — apply `wontfix` if not actionable

## Modifying labels

To use different label names in your issue tracker, update the mapping table above. The `triage` skill will respect whatever labels you've configured.

For example, if your repo uses `bug:needs-triage`, change the mapping to:

```
| needs-triage | `bug:needs-triage` |
```

## Label automation

- `needs-triage` — applied by `/triage` on new issues/PRs
- `needs-info` — applied when an issue needs reporter input
- `ready-for-agent` — applied when an issue is fully specified
- `ready-for-human` — applied when work requires human judgment
- `wontfix` — applied when an issue won't be actioned
