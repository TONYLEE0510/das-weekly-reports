"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { empIdToEmail } from "@/lib/auth";

export type LoginState = { error: string } | null;

/**
 * 사번/비밀번호 로그인. 사번을 합성 이메일로 매핑해 Supabase Auth로 인증한다.
 */
export async function login(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const employeeId = String(formData.get("employee_id") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!employeeId || !password) {
    return { error: "사번과 비밀번호를 모두 입력하세요." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: empIdToEmail(employeeId),
    password,
  });

  if (error) {
    return { error: "사번 또는 비밀번호가 올바르지 않습니다." };
  }

  redirect("/dashboard");
}

export async function logout(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
