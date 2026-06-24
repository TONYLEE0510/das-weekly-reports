# DAS 프로젝트 기술 스택 리포트 📋

Context7을 통해 조사한 **최신 기술 문서 요약**입니다.

---

## 1️⃣ **Next.js 14+ (App Router) + TypeScript**

**최신 설정 포인트:**
- ✅ **인증 미들웨어**: `createServerClient` + Supabase SSR 패턴 사용
- ✅ **세션 관리**: `next/headers`의 `cookies()` API로 HttpOnly 쿠키 관리
- ✅ **역할 기반 접근 제어 (RBAC)**: Route Handler에서 사용자 역할 검증
- ✅ **권장 구조**: 
  - `/app/lib/dal.ts` - 데이터 액세스 계층
  - `/app/lib/session.ts` - 세션 암호화
  - Proxy 미들웨어 (`proxy.ts`) - 모든 요청 인증 검증

**코드 예시:**
```typescript
// app/lib/session.ts - 세션 생성
export async function createSession(id: number) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  
  const data = await db.insert(sessions).values({
    userId: id,
    expiresAt,
  }).returning({ id: sessions.id })
  
  const sessionId = data[0].id
  const session = await encrypt({ sessionId, expiresAt })
  
  const cookieStore = await cookies()
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
  })
}
```

---

## 2️⃣ **Supabase (PostgreSQL + Auth)**

**최신 설정 포인트:**
- ✅ **Row Level Security (RLS)**: 모든 테이블에 필수 (데이터 보안)
- ✅ **인증 플로우**: `createServerClient` 사용 (클라이언트보다 권장)
- ✅ **자동 프로필 생성**: Auth 트리거로 신규 사용자 프로필 자동 생성
- ✅ **GRANT 설정**: 필수 역할(anon, authenticated, service_role)별 권한 설정

**필수 SQL:**
```sql
-- RLS 활성화
ALTER TABLE <table_name> ENABLE ROW LEVEL SECURITY;

-- 권한 설정 (중요!)
GRANT SELECT ON <table_name> TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON <table_name> TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON <table_name> TO service_role;

-- 자동 프로필 생성 트리거
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

**Next.js 미들웨어 패턴:**
```typescript
// 프록시 미들웨어에서 Supabase 세션 검증
const { data: { user } } = await supabase.auth.getUser()

if (!user && !request.nextUrl.pathname.startsWith('/login')) {
  const url = request.nextUrl.clone()
  url.pathname = '/login'
  return NextResponse.redirect(url)
}
```

---

## 3️⃣ **docx.js (DOCX 생성)**

**최신 설정 포인트:**
- ✅ **기본 구조**: `Document` → `Section` → `Table/Paragraph` 계층
- ✅ **테이블 생성**: 행/열 동적 생성 가능
- ✅ **스타일 지원**: Bold, Italics, 색상, 들여쓰기 등
- ✅ **파일 출력**: `Packer.toBuffer()` (Node.js) 또는 `toBlob()` (Browser)

**주간보고 생성 예시:**
```typescript
import { Document, Packer, Table, TableRow, TableCell, Paragraph, TextRun } from "docx";

const reportDoc = new Document({
    sections: [{
        children: [
            new Paragraph({
                text: "주간업무보고서",
                bold: true,
                size: 32
            }),
            new Table({
                rows: reportItems.map(item => 
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph(item.title)]
                            }),
                            new TableCell({
                                children: [new Paragraph(item.status)]
                            }),
                            new TableCell({
                                children: [new Paragraph(item.progress)]
                            })
                        ]
                    })
                )
            })
        ]
    }]
});

Packer.toBuffer(reportDoc).then(buffer => {
    fs.writeFileSync("report.docx", buffer);
});
```

---

## 📊 추가 필요 기술 (조사 결과)

| 기술 | 상태 | 비고 |
|------|------|------|
| **Tailwind CSS** | ✅ | 스타일링 (기존 스택) |
| **hunspell** | ⚠️ | Node.js 바인딩 확인 필수 (MVP 2순위) |
| **LibreOffice CLI** | ⚠️ | DOCX→HWP 변환 (로컬 테스트 권장) |
| **TypeORM/Prisma** | 없음 | SQL 직접 사용 권장 (간단함) |

---

## 🎯 구현 우선순위

1. **Week 1 (필수)**
   - Supabase DB 스키마 + RLS 설정
   - Next.js 미들웨어 (인증)
   - 기본 로그인 폼

2. **Week 2 (필수)**
   - 팀원 CRUD 폼
   - docx.js 보고서 생성 테스트

3. **Week 3 (필수)**
   - 팀장 선택 화면
   - DOCX 다운로드

---

## 🔗 참고 문서 링크

- **Next.js**: https://github.com/vercel/next.js (5,979 코드 스니펫, 82.96 점수)
- **Supabase**: https://github.com/supabase/supabase (21,488 코드 스니펫, 84.07 점수)
- **docx.js**: https://github.com/dolanmiu/docx (831 코드 스니펫, 82.97 점수)

모두 **High reputation, 80+ benchmark score** ✅

---

## 📝 핵심 체크리스트

- [ ] Supabase 프로젝트 생성 & DB 초기화
- [ ] RLS 정책 설정 (users, departments, weekly_reports, report_items)
- [ ] Next.js App Router + TypeScript 프로젝트 생성
- [ ] Supabase 미들웨어 구현
- [ ] 로그인 UI 구현
- [ ] docx.js 샘플 보고서 생성 테스트
- [ ] 팀원 입력 폼 CRUD
- [ ] 팀장 선택 화면
- [ ] DOCX 다운로드 기능
