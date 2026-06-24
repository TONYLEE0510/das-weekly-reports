# DAS (Document Automatic System) - Project Context

## 📋 What is DAS?

**DAS** is a web application that automates the weekly business report collection process for **NH 정보시스템** (NH Information Systems).

### Current Problem
- Weekly reports are written manually (offline, in spreadsheets/documents)
- Multiple approval levels (Team Member → Team Lead → Director → VP → Executive) require complex manual coordination
- Version control is unclear, progress tracking is opaque
- Significant time wasted on administrative work

### Proposed Solution
- **Digital-first**: All reports submitted online
- **Hierarchical rollup**: Each level automatically receives approved items from the level below
- **Standardized format**: Fixed 4 items per level (configurable in v2)
- **Automatic export**: Final report generated in DOCX/HWP format

---

## 👥 Key Actors & Workflows

### 1️⃣ Team Member (팀원)
**Role**: Input provider (first step in the hierarchy)

**Workflow**:
1. Log in with employee ID + password
2. Fill out report form with:
   - Task title (업무제목)
   - Status (완료/계속/신규)
   - Assignee name
   - Description (업무설명)
   - Start/end dates
   - Progress status (e.g., "개발 50%")
3. Submit report → enters "submitted" state
4. Can re-edit after submission (draft/resubmit cycle)

**Data**: Creates `report_items` under their `weekly_report` (level=team)

---

### 2️⃣ Team Lead / Manager (팀장)
**Role**: Selector and editor (aggregates team items)

**Workflow**:
1. Log in
2. **View** all submitted items from their team members
3. **Select exactly 4** items (via checkbox)
   - Once 4 are checked, "Confirm Submit" button activates
   - Cannot submit with ≠4 items
4. **(Optional)** Edit the text of selected items
5. **Confirm** → locks in selection, sends to director
6. **Export** → download as DOCX file
   - Shows all 4 selected items formatted as a report
   - Optional: HWP export via LibreOffice (v2)

**Data**: Creates `weekly_report` (level=manager) with `report_items` marked as selected

**Permissions**: Can only see their own team members' items (via RLS)

---

### 3️⃣ Director / VP / Executive (부장/본부장/임원)
**Role**: Same as manager, but for higher-level data

**Workflow**:
- Identical to manager workflow
- Input: items from team leads (marked as selected)
- Output: 4 selected items forwarded to next level
- Final level (executive) generates corp-wide report

**Design Note**: Generic UI/logic allows any level → the interface doesn't need to know whether it's a manager, director, or VP. DB schema captures `level` field.

---

## 🗄️ Database Model

### Core Tables

**`users`**
```
id (UUID) → user identifier
employee_id (VARCHAR UNIQUE) → 사번
name, role → employee metadata
department_id → FK to departments
password_hash → Supabase Auth integration
```

**`departments`**
```
id (UUID) → dept identifier
name → "Team A", "Sales Division", "HQ", etc.
type → enum: team/department/division/company
parent_id → hierarchical reference (self-join)
selection_count → how many items this level selects (default 4)
```

**`weekly_reports`**
```
id (UUID)
week_start (DATE) → which week is this for
department_id → which dept owns this report
level → enum: team/manager/director/vp/executive
status → enum: draft/submitted/confirmed
created_at, confirmed_at
```

**`report_items`**
```
id (UUID)
report_id → FK to weekly_reports
author_id → who originally created it

-- Content
title, status_tag, assignee_name, description, date_start, date_end, progress

-- Editing
edited_description → latest version after manager/director edits (no history)

-- Selection tracking
selected (BOOLEAN) → was this selected?
selected_at_level → which level selected it
selected_at_department_id → which dept selected it
approved (BOOLEAN) → is it confirmed/locked in?
item_order → ordering within the 4 selected
```

### Row Level Security (RLS)

All tables have RLS enabled. Policies:

1. **Team members** see only their own `report_items`
2. **Managers** see:
   - Their own items (as author)
   - All items from their team members
   - Cannot see manager items until selected
3. **Directors** see:
   - Manager items marked as selected from their division
   - Cannot see team-level items
4. **VPs/Executives** see higher-level aggregates only

---

## 🔐 Authentication & Authorization

### Supabase Auth (JWT)
- Employee ID + password signup/login
- JWT stored in httpOnly cookie (secure)
- Server-side session validation on all routes

### Role Enforcement
- `users.role` field: team/manager/director/vp/executive
- RLS policies check `auth.uid()` and `users.role`
- Cannot spoof roles — database enforces it

---

## 🎯 Core Business Rules

### Rule 1: Selection Constraint
- Each level **must select exactly 4 items** from lower level
- UI disables "Confirm" button until count = 4
- Backend validates on submission

### Rule 2: Hierarchical Flow
- Tier 1: Team members submit → `weekly_reports.level = 'team'`
- Tier 2: Managers select 4 → `weekly_reports.level = 'manager'`
- Tier 3+: Repeat until executive level

### Rule 3: Text Editing
- Each level can edit the `description` of selected items
- Only **latest version** is kept (no audit trail in MVP)
- After editing, `edited_description` is stored; `description` is original

### Rule 4: Selection Lockdown
- Once a level confirms (status=confirmed), cannot add/remove items
- Can re-edit text even after confirmation (allows corrections)
- Moving to next level is automatic (via app logic, not manual)

### Rule 5: Initial Data
- Organizations/departments loaded via JSON/SQL (no Excel import in MVP)
- Admins manually insert `departments` and `users` at project start

---

## 🛠️ Technical Stack

| Layer | Tech | Notes |
|-------|------|-------|
| **Frontend** | Next.js 14 (App Router) + TypeScript + Tailwind | SSR for SEO, API routes for backend |
| **Backend** | Supabase (PostgreSQL) | Hosted DB, RLS, Auth, Edge Functions if needed (v2) |
| **Deployment** | Vercel | Next.js optimal, automatic CI/CD |
| **Export** | docx.js (Node) | Generate DOCX in-memory, no external service |
| | LibreOffice CLI | DOCX → HWP conversion (MVP 2, optional) |
| **Spell-check** | hunspell | Real-time typo detection (MVP 2, optional) |

### API Design
- **RESTful** with proper HTTP methods
- Authentication via JWT cookie (not header)
- Response format: `{ data, error, code }`
- Pagination for large result sets

---

## 📈 MVP Timeline & Phases

### Phase 1: Week 1 (Foundations)
- Supabase schema + RLS setup
- Next.js project + Supabase middleware
- Login page

**Deliverable**: Auth flow working end-to-end

### Phase 2: Week 2 (Input)
- Team member form + CRUD (create/read/update/delete)
- Form validation
- Submit workflow

**Deliverable**: Team members can create & submit reports

### Phase 3: Week 3 (Selection & Export)
- Manager selection UI (4-item picker)
- DOCX export via docx.js
- E2E testing

**Deliverable**: Managers can select 4 items and download as DOCX

### Phase 4+: v2 (Scaling)
- Multi-level UI (director/VP/executive) — code reuse from manager
- Spell-check, HWP export, etc.
- System admin panel for org management

---

## ⚠️ Known Constraints & Decisions

### Constraint 1: Fixed Selection Count
- Currently hardcoded to 4 items per level
- Configuration moved to v2 (later optimization)
- Database supports dynamic count (`selection_count` field) but UI doesn't

### Constraint 2: No Audit Trail
- Text edits don't store history
- Only latest version of each item is kept
- Acceptable for MVP (org uses this internally, not for legal/compliance)

### Constraint 3: No Notifications
- Managers don't get alerts when new items are submitted
- Admins don't get alerts when org changes
- Email/SMS alerts moved to v2

### Constraint 4: Manual Org Setup
- No Excel import wizard
- DBA/admin manually loads `departments` table via SQL
- Acceptable for single org with ~50-100 people

### Constraint 5: One Report Per Week
- System assumes one report per team per calendar week
- Multiple reports per week not supported (edge case for MVP)
- Can be extended in v2

---

## 🔍 Debugging & Monitoring

### Logging
- API errors logged to console (dev) and stdout (prod Vercel)
- Database slow queries: monitor Supabase dashboard
- RLS policy violations: check Supabase Auth logs

### Common Issues
1. **"Permission denied" error**: User lacks dept_id or role mismatch
   - **Fix**: Check `users.role` and `users.department_id` in Supabase
2. **"Cannot select item"**: Item already selected or count < 4
   - **Fix**: Check UI state, validate item.selected status
3. **"DOCX export failed"**: docx.js dependency missing
   - **Fix**: `npm install docx`

---

## 🎓 Terminology & Abbreviations

| Term | Definition |
|------|-----------|
| **RLS** | Row Level Security — database-level access control |
| **JWT** | JSON Web Token — stateless auth, stored in cookie |
| **Rollup** | Aggregation of child items into parent-level report |
| **Selection** | Process of picking exactly 4 items to forward |
| **Confirm** | Locking in a selection, moving to next level |
| **Weekly Report** | Container for all items at one level for one week |
| **Report Item** | Single task/work entry |

---

## 📚 Related Documents

- **[final_spec.md](./final_spec.md)** — Full specification (requirements, timelines, success criteria)
- **[tech.md](./tech.md)** — Technology research (latest docs, setup patterns)
- **[DAS-MVP-PRD.md](./DAS-MVP-PRD.md)** — Product Requirements Document (user stories, API design)
- **[CLAUDE.md](./CLAUDE.md)** — Claude Code configuration (agent skills, settings)
- **[docs/agents/](./docs/agents/)** — Agent skill documentation (issue tracking, triage labels)

---

## 💡 Design Philosophy

1. **Simple over perfect**: MVP uses hardcoded configs, manual data entry
2. **User-focused**: No complex UX — straightforward workflows for team members, managers
3. **Secure by default**: RLS on all tables, no client-side auth, httpOnly cookies
4. **Extensible**: Generic rollup logic allows future levels without code duplication
5. **No surprises**: Clear error messages, predictable behavior, no hidden side effects

---

## 🚀 Getting Started (For Developers)

1. **Environment Setup**:
   ```bash
   git clone https://github.com/TONYLEE0510/das-weekly-reports
   cd das-weekly-reports
   npm install
   ```

2. **Supabase Setup**:
   ```bash
   supabase start  # local dev instance
   # or create project at supabase.com
   ```

3. **Load Schema**:
   - Copy SQL from [final_spec.md](./final_spec.md) Section 7
   - Run in Supabase SQL editor

4. **Environment Variables**:
   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   SUPABASE_SERVICE_ROLE_KEY=...  # for server-side
   ```

5. **Run Dev Server**:
   ```bash
   npm run dev
   # http://localhost:3000
   ```

6. **Start Coding**:
   - See GitHub Issues #1–#30 for tasks
   - Pick `priority:critical` issues first
   - Label as `in-progress` when starting work
   - Open PR → merge after review

---

## 📞 Questions?

Refer to this CONTEXT.md as the source of truth for **why** decisions were made. For **how** (implementation details), check the relevant code and comments. For **what** (features), see [final_spec.md](./final_spec.md).
