import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * PATCH /api/reports/:id/edited — 선택 항목의 문구(edited_description)만 수정.
 * 팀장(같은 부서 팀원 항목) 또는 작성자 본인이 수정 가능(RLS로 강제).
 * 원문(description)은 보존하고 최신 편집본만 유지(이력 없음).
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

  let body: { edited_description?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const edited = String(body.edited_description ?? "");

  const { data, error } = await supabase
    .from("report_items")
    .update({
      edited_description: edited || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("id, edited_description")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (!data) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  return NextResponse.json({ data });
}
