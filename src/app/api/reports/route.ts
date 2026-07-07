import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { classifySection, thisWeekMonday } from "@/lib/report/classify";

const STATUS_TAGS = ["완료", "계속", "신규"] as const;

/**
 * GET /api/reports — 로그인한 팀원 본인의 보고서 항목 목록 (RLS로 스코프됨)
 */
export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("report_items")
    .select(
      "id, title, status_tag, assignee_name, description, change_before, change_after, date_start, date_end, progress, report_section, created_at",
    )
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ data });
}

/**
 * POST /api/reports — 팀원 항목 생성.
 * 이번주 team-level 주간보고 컨테이너를 자동 생성/재사용하고 금주/차주를 자동분류한다.
 */
export async function POST(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, department_id")
    .eq("id", user.id)
    .single();

  if (!profile?.department_id) {
    return NextResponse.json(
      { error: "부서가 지정되지 않은 사용자입니다." },
      { status: 400 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const title = String(body.title ?? "").trim();
  const statusTag = String(body.status_tag ?? "").trim();

  if (!title) {
    return NextResponse.json({ error: "업무제목은 필수입니다." }, { status: 400 });
  }
  if (!STATUS_TAGS.includes(statusTag as (typeof STATUS_TAGS)[number])) {
    return NextResponse.json(
      { error: "상태는 완료/계속/신규 중 하나여야 합니다." },
      { status: 400 },
    );
  }

  const dateStart = (body.date_start as string) || null;
  const dateEnd = (body.date_end as string) || null;
  const weekStart = thisWeekMonday();

  // 이번주 team-level 주간보고 컨테이너 find-or-create
  const { data: report, error: reportError } = await supabase
    .from("weekly_reports")
    .upsert(
      {
        week_start: weekStart,
        department_id: profile.department_id,
        level: "team",
      },
      { onConflict: "week_start,department_id,level" },
    )
    .select("id")
    .single();

  if (reportError || !report) {
    return NextResponse.json(
      { error: reportError?.message ?? "주간보고 생성 실패" },
      { status: 500 },
    );
  }

  const reportSection = classifySection(dateStart, dateEnd);

  const { data: item, error: itemError } = await supabase
    .from("report_items")
    .insert({
      report_id: report.id,
      author_id: user.id,
      title,
      status_tag: statusTag,
      assignee_name: (body.assignee_name as string) || null,
      description: (body.description as string) || null,
      change_before: (body.change_before as string) || null,
      change_after: (body.change_after as string) || null,
      date_start: dateStart,
      date_end: dateEnd,
      progress: (body.progress as string) || null,
      report_section: reportSection,
    })
    .select(
      "id, title, status_tag, assignee_name, description, change_before, change_after, date_start, date_end, progress, report_section, created_at",
    )
    .single();

  if (itemError) {
    return NextResponse.json({ error: itemError.message }, { status: 500 });
  }

  return NextResponse.json({ data: item }, { status: 201 });
}
