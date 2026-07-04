-- S1: 조직도(departments) + 프로필(profiles) + 가입 시 프로필 자동생성 트리거 + RLS
-- 인증은 Supabase Auth(auth.users)가 담당하고, 앱 도메인 정보는 profiles가 보관한다.
-- 사번(employee_id)은 로그인 시 {employee_id}@das.local 이메일로 내부 매핑된다.

-- ── 부서/조직 ──────────────────────────────────────────────
create table if not exists public.departments (
  id uuid primary key default gen_random_uuid(),
  name varchar not null,
  type varchar not null check (type in ('team', 'department', 'division', 'company')),
  parent_id uuid references public.departments(id),
  selection_count integer not null default 4,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── 프로필 (auth.users 1:1) ────────────────────────────────
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  employee_id varchar unique not null,
  name varchar not null,
  role varchar not null check (role in ('team', 'manager', 'director', 'vp', 'executive', 'admin')),
  department_id uuid references public.departments(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists profiles_department_id_idx on public.profiles(department_id);

-- ── RLS ────────────────────────────────────────────────────
alter table public.departments enable row level security;
alter table public.profiles enable row level security;

-- 조직도는 로그인 사용자 모두 조회 가능
drop policy if exists "departments readable by authenticated" on public.departments;
create policy "departments readable by authenticated"
  on public.departments for select
  to authenticated using (true);

-- 프로필은 본인 것만 조회 가능 (상위자의 하위 조회는 이후 슬라이스에서 확장)
drop policy if exists "profile readable by self" on public.profiles;
create policy "profile readable by self"
  on public.profiles for select
  to authenticated using ((select auth.uid()) = id);

grant select on public.departments to authenticated;
grant select on public.profiles to authenticated;

-- ── 가입 시 프로필 자동 생성 ───────────────────────────────
-- auth.users에 사용자가 생기면 user_metadata를 읽어 profiles를 채운다.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, employee_id, name, role, department_id)
  values (
    new.id,
    new.raw_user_meta_data->>'employee_id',
    coalesce(new.raw_user_meta_data->>'name', ''),
    coalesce(new.raw_user_meta_data->>'role', 'team'),
    nullif(new.raw_user_meta_data->>'department_id', '')::uuid
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
