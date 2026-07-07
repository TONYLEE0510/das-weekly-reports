import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { thisWeekMonday } from "@/lib/report/classify";
import { SELECTION_COUNT } from "@/lib/report/constants";

/**
 * POST /api/reports/confirm — 팀장이 정확히 4개를 선택·확정하고 상위(팀장 레벨)로 롤업.
 * body: { itemIds: string[] }  (정확히 SELECTION_COUNT개)
 *
 * 재확정 가능: 이 부서에서 이전에 manager 레벨로 선택된 항목을 초기화한 뒤 새 선택을 적용한다.
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
    .select("id, role, department_id")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "manager" || !profile.department_id) {
    return NextResponse.json({ error: "팀장만 확정할 수 있습니다." }, { status: 403 });
  }

  let body: { itemIds?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const itemIds = Array.isArray(body.itemIds)
    ? [...new Set(body.itemIds.map(String))]
    : [];

  if (itemIds.length !== SELECTION_COUNT) {
    return NextResponse.json(
      { error: `정확히 ${SELECTION_COUNT}개를 선택해야 합니다.` },
      { status: 400 },
    );
  }

  const dept = profile.department_id;

  // manager 레벨 주간보고 컨테이너 find-or-create + 확정 처리
  const { data: report, error: reportError } = await supabase
    .from("weekly_reports")
    .upsert(
      {
        week_start: thisWeekMonday(),
        department_id: dept,
        level: "manager",
        status: "confirmed",
        confirmed_at: new Date().toISOString(),
      },
      { onConflict: "week_start,department_id,level" },
    )
    .select("id")
    .single();

  if (reportError || !report) {
    return NextResponse.json(
      { error: reportError?.message ?? "확정 실패" },
      { status: 500 },
    );
  }

  // 이 부서에서 이전에 manager로 선택된 항목 초기화 (재확정 지원)
  const { error: clearError } = await supabase
    .from("report_items")
    .update({
      selected: false,
      approved: false,
      selected_at_level: null,
      selected_at_department_id: null,
      item_order: null,
    })
    .eq("selected_at_department_id", dept)
    .eq("selected_at_level", "manager");

  if (clearError) {
    return NextResponse.json({ error: clearError.message }, { status: 500 });
  }

  // 선택한 4개를 순서와 함께 확정
  for (let i = 0; i < itemIds.length; i++) {
    const { error: updateError } = await supabase
      .from("report_items")
      .update({
        selected: true,
        approved: true,
        selected_at_level: "manager",
        selected_at_department_id: dept,
        item_order: i + 1,
      })
      .eq("id", itemIds[i]);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true, reportId: report.id });
}
