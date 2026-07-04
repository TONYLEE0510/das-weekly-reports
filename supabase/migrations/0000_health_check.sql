-- S0: 트레이서 불릿용 헬스체크 테이블
-- schema → API(PostgREST) → UI 경로가 끝까지 연결되는지 증명하기 위한 최소 테이블.
-- 이후 슬라이스(S1+)에서 실제 도메인 스키마가 추가된다.

create table if not exists public.health_check (
  id integer primary key,
  status text not null,
  checked_at timestamptz not null default now()
);

-- 시드: 항상 1행 유지
insert into public.health_check (id, status)
values (1, 'ok')
on conflict (id) do update set status = excluded.status, checked_at = now();

-- RLS: 익명(anon)도 읽기만 가능 (연결 확인용)
alter table public.health_check enable row level security;

drop policy if exists "health_check readable by anyone" on public.health_check;
create policy "health_check readable by anyone"
  on public.health_check
  for select
  using (true);

grant select on public.health_check to anon, authenticated;
