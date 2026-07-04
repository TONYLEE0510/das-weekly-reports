import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * 서버(서버 컴포넌트/Route Handler/Server Action)용 Supabase 클라이언트.
 * 요청 쿠키를 통해 사용자 세션을 읽고, RLS 정책이 적용됩니다.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // 서버 컴포넌트에서 호출된 경우 set이 무시될 수 있음.
            // 미들웨어에서 세션을 갱신하면 문제 없음.
          }
        },
      },
    },
  );
}
