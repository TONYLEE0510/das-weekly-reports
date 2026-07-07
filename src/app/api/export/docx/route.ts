import { createClient } from "@/lib/supabase/server";
import { buildReportDocx, type DocxItem } from "@/lib/report/docx";
import { thisWeekMonday } from "@/lib/report/classify";

/**
 * GET /api/export/docx — 팀장이 확정한 이번 주 4개 항목을 DOCX로 생성해 다운로드.
 */
export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return new Response("unauthenticated", { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, role, department_id")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "manager" || !profile.department_id) {
    return new Response("forbidden", { status: 403 });
  }

  const { data: dept } = await supabase
    .from("departments")
    .select("name")
    .eq("id", profile.department_id)
    .single();

  const { data: items } = await supabase
    .from("report_items")
    .select(
      "title, status_tag, assignee_name, description, edited_description, progress, date_start, date_end, report_section, item_order",
    )
    .eq("selected_at_department_id", profile.department_id)
    .eq("selected_at_level", "manager")
    .order("item_order", { ascending: true });

  if (!items || items.length === 0) {
    return new Response("확정된 항목이 없습니다.", { status: 409 });
  }

  const weekStart = thisWeekMonday();
  const buffer = await buildReportDocx(items as DocxItem[], {
    departmentName: dept?.name ?? "부서",
    weekStart,
  });

  const filename = `weekly-report-${weekStart}.docx`;
  return new Response(new Uint8Array(buffer), {
    status: 200,
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
