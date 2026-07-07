-- S4: 팀장(manager)이 자기 부서 팀원 항목을 조회/선택할 수 있도록 RLS 확장
-- 시드 기준: 팀장과 팀원이 같은 team 부서(카드개발1팀)에 속한다.

-- 팀장은 같은 부서 팀원들의 프로필(이름 표시용)을 조회 가능
drop policy if exists "profiles readable by same-dept manager" on public.profiles;
create policy "profiles readable by same-dept manager"
  on public.profiles for select to authenticated
  using (
    exists (
      select 1 from public.profiles me
      where me.id = auth.uid()
        and me.role = 'manager'
        and me.department_id = profiles.department_id
    )
  );

-- 팀장은 같은 부서 팀원이 작성한 보고 항목을 조회 가능
drop policy if exists "ri select by same-dept manager" on public.report_items;
create policy "ri select by same-dept manager"
  on public.report_items for select to authenticated
  using (
    exists (
      select 1 from public.profiles me, public.profiles author
      where me.id = auth.uid()
        and me.role = 'manager'
        and author.id = report_items.author_id
        and author.department_id = me.department_id
    )
  );

-- 팀장은 같은 부서 팀원 항목의 선택 플래그(selected/approved 등)를 수정 가능
drop policy if exists "ri update by same-dept manager" on public.report_items;
create policy "ri update by same-dept manager"
  on public.report_items for update to authenticated
  using (
    exists (
      select 1 from public.profiles me, public.profiles author
      where me.id = auth.uid()
        and me.role = 'manager'
        and author.id = report_items.author_id
        and author.department_id = me.department_id
    )
  )
  with check (
    exists (
      select 1 from public.profiles me, public.profiles author
      where me.id = auth.uid()
        and me.role = 'manager'
        and author.id = report_items.author_id
        and author.department_id = me.department_id
    )
  );
