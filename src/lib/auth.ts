import { createClient } from "@/lib/supabase/server";

/**
 * 사번(employee_id)을 Supabase Auth 이메일로 매핑.
 * Supabase Auth는 이메일 기반이므로 사번을 합성 이메일로 변환해 사용한다.
 */
export function empIdToEmail(employeeId: string): string {
  return `${employeeId.trim().toLowerCase()}@das.local`;
}

export type Role =
  | "team"
  | "manager"
  | "director"
  | "vp"
  | "executive"
  | "admin";

export interface Profile {
  id: string;
  employee_id: string;
  name: string;
  role: Role;
  department_id: string | null;
}

/**
 * 현재 로그인 사용자의 프로필을 반환. 미인증이면 null.
 */
export async function getCurrentProfile(): Promise<Profile | null> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("id, employee_id, name, role, department_id")
    .eq("id", user.id)
    .single();

  if (error || !data) return null;
  return data as Profile;
}

/** 역할 한글 라벨 */
export const ROLE_LABEL: Record<Role, string> = {
  team: "팀원",
  manager: "팀장",
  director: "부장",
  vp: "본부장",
  executive: "임원",
  admin: "시스템 관리자",
};
