import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { classifySection } from "@/lib/report/classify";

const STATUS_TAGS = ["완료", "계속", "신규"] as const;

/**
 * PATCH /api/reports/:id — 본인 항목 수정. 날짜가 바뀌면 금주/차주를 재계산한다.
 * (RLS로 타인 항목 수정은 차단됨)
 */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
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
  const reportSection = classifySection(dateStart, dateEnd);

  const { data, error } = await supabase
    .from("report_items")
    .update({
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
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select(
      "id, title, status_tag, assignee_name, description, change_before, change_after, date_start, date_end, progress, report_section, created_at",
    )
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (!data) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  return NextResponse.json({ data });
}

/**
 * DELETE /api/reports/:id — 본인 항목 삭제. (RLS로 타인 항목 삭제 차단)
 */
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }

  const { error } = await supabase.from("report_items").delete().eq("id", id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
