// 데모 사용자 시드 스크립트 (S1)
// 실행: node scripts/seed-users.mjs
// 필요 env: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
//
// 조직도 시드(0002_seed_departments.sql)가 먼저 적용되어 있어야 한다.
// service_role 키로 auth.users를 생성하면 트리거가 profiles를 자동 생성한다.

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";

// .env.local 간단 로더 (외부 의존성 없이)
try {
  const env = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
  for (const line of env.split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
} catch {
  // .env.local 없으면 실제 환경변수 사용
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error("❌ NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY 필요");
  process.exit(1);
}

const admin = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const DEPT_TEAM = "00000000-0000-0000-0000-000000000004"; // 카드개발1팀
const DEPT_DEPARTMENT = "00000000-0000-0000-0000-000000000003"; // 카드개발부
const DEPT_DIVISION = "00000000-0000-0000-0000-000000000002"; // 카드본부

const DEFAULT_PASSWORD = "das1234!";

const users = [
  { employee_id: "1001", name: "김팀원", role: "team", department_id: DEPT_TEAM },
  { employee_id: "1002", name: "이팀원", role: "team", department_id: DEPT_TEAM },
  { employee_id: "2001", name: "박팀장", role: "manager", department_id: DEPT_TEAM },
  { employee_id: "3001", name: "최부장", role: "director", department_id: DEPT_DEPARTMENT },
  { employee_id: "4001", name: "정본부장", role: "vp", department_id: DEPT_DIVISION },
];

function empIdToEmail(id) {
  return `${id.toLowerCase()}@das.local`;
}

for (const u of users) {
  const email = empIdToEmail(u.employee_id);
  const { error } = await admin.auth.admin.createUser({
    email,
    password: DEFAULT_PASSWORD,
    email_confirm: true,
    user_metadata: {
      employee_id: u.employee_id,
      name: u.name,
      role: u.role,
      department_id: u.department_id,
    },
  });

  if (error) {
    if (String(error.message).includes("already")) {
      console.log(`• ${u.employee_id} ${u.name} — 이미 존재 (건너뜀)`);
    } else {
      console.error(`❌ ${u.employee_id} ${u.name}: ${error.message}`);
    }
  } else {
    console.log(`✓ ${u.employee_id} ${u.name} (${u.role}) 생성`);
  }
}

console.log(`\n완료. 모든 계정 비밀번호: ${DEFAULT_PASSWORD}`);
