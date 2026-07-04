import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type HealthResult =
  | { state: "no-env" }
  | { state: "ok"; status: string; checkedAt: string }
  | { state: "error"; message: string };

async function checkHealth(): Promise<HealthResult> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anon) {
    return { state: "no-env" };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("health_check")
      .select("status, checked_at")
      .eq("id", 1)
      .single();

    if (error) {
      return { state: "error", message: error.message };
    }

    return {
      state: "ok",
      status: data.status,
      checkedAt: data.checked_at,
    };
  } catch (e) {
    return {
      state: "error",
      message: e instanceof Error ? e.message : "알 수 없는 오류",
    };
  }
}

export default async function Home() {
  const health = await checkHealth();

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center gap-8 p-8">
      <div>
        <h1 className="text-3xl font-bold">DAS</h1>
        <p className="mt-1 text-sm text-gray-500">
          주간업무보고 자동화 시스템 · S0 헬스체크
        </p>
      </div>

      <section className="rounded-lg border p-6">
        <h2 className="mb-4 text-lg font-semibold">Supabase 연결 상태</h2>

        {health.state === "ok" && (
          <div className="flex items-center gap-3">
            <span className="inline-block h-3 w-3 rounded-full bg-green-500" />
            <div>
              <p className="font-medium text-green-700">
                연결 성공 (status: {health.status})
              </p>
              <p className="text-sm text-gray-500">
                checked_at: {new Date(health.checkedAt).toLocaleString("ko-KR")}
              </p>
            </div>
          </div>
        )}

        {health.state === "no-env" && (
          <div className="flex items-start gap-3">
            <span className="mt-1 inline-block h-3 w-3 rounded-full bg-yellow-500" />
            <div>
              <p className="font-medium text-yellow-700">환경변수 미설정</p>
              <p className="text-sm text-gray-500">
                <code>.env.example</code>를 <code>.env.local</code>로 복사하고
                Supabase 값을 채운 뒤, <code>supabase/migrations</code>의 SQL을
                실행하세요.
              </p>
            </div>
          </div>
        )}

        {health.state === "error" && (
          <div className="flex items-start gap-3">
            <span className="mt-1 inline-block h-3 w-3 rounded-full bg-red-500" />
            <div>
              <p className="font-medium text-red-700">연결 실패</p>
              <p className="text-sm text-gray-500">{health.message}</p>
              <p className="mt-1 text-sm text-gray-500">
                마이그레이션(<code>0000_health_check.sql</code>)을 실행했는지
                확인하세요.
              </p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
