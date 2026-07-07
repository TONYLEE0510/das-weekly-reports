import { redirect } from "next/navigation";
import { getCurrentProfile, ROLE_LABEL } from "@/lib/auth";
import { logout } from "@/app/login/actions";
import { createClient } from "@/lib/supabase/server";
import { ReportForm } from "@/components/report-form";
import { ReportItems, type ReportItem } from "@/components/report-items";
import { ManagerSelect, type ManagerItem } from "@/components/manager-select";
import { thisWeekMonday } from "@/lib/report/classify";

export const dynamic = "force-dynamic";

async function getMyItems(): Promise<ReportItem[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("report_items")
    .select(
      "id, title, status_tag, assignee_name, description, change_before, change_after, date_start, date_end, progress, report_section, created_at",
    )
    .order("created_at", { ascending: false });
  return (data as ReportItem[]) ?? [];
}

/** 팀장 화면: 이번 주 팀원(team 레벨) 제출 항목 */
async function getTeamItems(): Promise<ManagerItem[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("report_items")
    .select(
      "id, title, status_tag, progress, report_section, selected, author:profiles!author_id(name), report:weekly_reports!inner(week_start, level)",
    )
    .eq("report.level", "team")
    .eq("report.week_start", thisWeekMonday())
    .order("created_at", { ascending: false });

  type Row = {
    id: string;
    title: string;
    status_tag: string;
    progress: string | null;
    report_section: ManagerItem["report_section"];
    selected: boolean;
    author: { name: string | null } | { name: string | null }[] | null;
  };

  return ((data as Row[] | null) ?? []).map((r) => {
    const author = Array.isArray(r.author) ? r.author[0] : r.author;
    return {
      id: r.id,
      title: r.title,
      status_tag: r.status_tag,
      progress: r.progress,
      report_section: r.report_section,
      selected: r.selected,
      author_name: author?.name ?? null,
    };
  });
}

export default async function DashboardPage() {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");

  const isTeamMember = profile.role === "team";
  const isManager = profile.role === "manager";
  const items = isTeamMember ? await getMyItems() : [];
  const teamItems = isManager ? await getTeamItems() : [];

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-8 p-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">대시보드</h1>
          <p className="mt-1 text-sm text-gray-500">
            {profile.name}님 ({ROLE_LABEL[profile.role]})
          </p>
        </div>
        <form action={logout}>
          <button
            type="submit"
            className="rounded border px-3 py-1.5 text-sm font-medium hover:bg-gray-50"
          >
            로그아웃
          </button>
        </form>
      </header>

      {isTeamMember ? (
        <>
          <section className="rounded-lg border p-6">
            <h2 className="mb-4 text-lg font-semibold">주간보고 작성</h2>
            <ReportForm />
          </section>

          <section className="rounded-lg border p-6">
            <h2 className="mb-4 text-lg font-semibold">
              내 보고 항목 ({items.length})
            </h2>
            <ReportItems items={items} />
          </section>
        </>
      ) : isManager ? (
        <section className="rounded-lg border p-6">
          <h2 className="mb-4 text-lg font-semibold">
            팀원 보고 항목 선택 (이번 주)
          </h2>
          <ManagerSelect items={teamItems} />
        </section>
      ) : (
        <section className="rounded-lg border border-dashed p-6 text-sm text-gray-500">
          {ROLE_LABEL[profile.role]} 화면(하위 항목 선택·확정)은 S7(다계층
          확장)에서 추가됩니다.
        </section>
      )}
    </main>
  );
}
