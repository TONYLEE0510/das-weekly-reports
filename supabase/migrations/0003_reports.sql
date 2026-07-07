-- S2: 주간보고(weekly_reports) + 보고서 항목(report_items) + RLS
-- 팀원은 자기 항목만 조회/수정/삭제. 상위자(팀장+) 조회는 이후 슬라이스(S4)에서 확장.

-- ── 주간보고 (계층별 주차 묶음) ────────────────────────────
create table if not exists public.weekly_reports (
  id uuid primary key default gen_random_uuid(),
  week_start date not null,
  department_id uuid not null references public.departments(id),
  level varchar not null check (level in ('team', 'manager', 'director', 'vp', 'executive')),
  status varchar not null default 'draft' check (status in ('draft', 'submitted', 'confirmed')),
  created_at timestamptz not null default now(),
  confirmed_at timestamptz,
  unique (week_start, department_id, level)
);

-- ── 보고서 항목 (1건) ──────────────────────────────────────
create table if not exists public.report_items (
  id uuid primary key default gen_random_uuid(),
  report_id uuid not null references public.weekly_reports(id) on delete cascade,
  author_id uuid not null references public.profiles(id),

  -- 기본정보
  title varchar not null,
  status_tag varchar not null check (status_tag in ('완료', '계속', '신규')),
  assignee_name varchar,

  -- 내용
  description text,
  edited_description text,
  change_before text,   -- 변경 전 수행사항
  change_after text,    -- 변경 후 수행사항

  -- 일정 (자동분류 입력)
  date_start date,
  date_end date,
  progress varchar,     -- 예: "개발(10%)", "완료"

  -- 자동분류 결과
  report_section varchar not null default 'this_week'
    check (report_section in ('this_week', 'next_week')),

  -- 상태 & 롤업 (S4+에서 사용)
  selected boolean not null default false,
  selected_at_level varchar,
  selected_at_department_id uuid references public.departments(id),
  approved boolean not null default false,
  item_order integer,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists report_items_author_idx on public.report_items(author_id);
create index if not exists report_items_report_idx on public.report_items(report_id);

-- ── RLS ────────────────────────────────────────────────────
alter table public.weekly_reports enable row level security;
alter table public.report_items enable row level security;

-- 주간보고: 본인 부서의 것만 조회/생성 (팀원이 자기 팀 team-level 컨테이너를 다룸)
drop policy if exists "wr select own dept" on public.weekly_reports;
create policy "wr select own dept"
  on public.weekly_reports for select to authenticated
  using (department_id = (select department_id from public.profiles where id = auth.uid()));

drop policy if exists "wr insert own dept" on public.weekly_reports;
create policy "wr insert own dept"
  on public.weekly_reports for insert to authenticated
  with check (department_id = (select department_id from public.profiles where id = auth.uid()));

-- 보고서 항목: 작성자 본인만 (조회/생성/수정/삭제)
drop policy if exists "ri select own" on public.report_items;
create policy "ri select own"
  on public.report_items for select to authenticated
  using (author_id = auth.uid());

drop policy if exists "ri insert own" on public.report_items;
create policy "ri insert own"
  on public.report_items for insert to authenticated
  with check (author_id = auth.uid());

drop policy if exists "ri update own" on public.report_items;
create policy "ri update own"
  on public.report_items for update to authenticated
  using (author_id = auth.uid())
  with check (author_id = auth.uid());

drop policy if exists "ri delete own" on public.report_items;
create policy "ri delete own"
  on public.report_items for delete to authenticated
  using (author_id = auth.uid());

grant select, insert, update, delete on public.weekly_reports to authenticated;
grant select, insert, update, delete on public.report_items to authenticated;
