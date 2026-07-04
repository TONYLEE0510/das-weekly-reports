import { redirect } from "next/navigation";
import { getCurrentProfile, ROLE_LABEL } from "@/lib/auth";
import { logout } from "@/app/login/actions";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const profile = await getCurrentProfile();

  // 미들웨어가 1차 보호하지만, 프로필 없는 경우까지 방어
  if (!profile) {
    redirect("/login");
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-8 p-8">
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

      <section className="rounded-lg border p-6">
        <h2 className="mb-3 text-lg font-semibold">내 정보</h2>
        <dl className="grid grid-cols-[6rem_1fr] gap-y-2 text-sm">
          <dt className="text-gray-500">사번</dt>
          <dd>{profile.employee_id}</dd>
          <dt className="text-gray-500">이름</dt>
          <dd>{profile.name}</dd>
          <dt className="text-gray-500">역할</dt>
          <dd>{ROLE_LABEL[profile.role]}</dd>
        </dl>
      </section>

      <section className="rounded-lg border border-dashed p-6 text-sm text-gray-500">
        여기에 역할별 기능이 추가됩니다. (S2: 팀원 입력 폼 · S4: 팀장 선택 화면)
      </section>
    </main>
  );
}
