# DAS (Document Automatic System) MVP PRD

## 🎯 핵심 네러티브

운영업무 담당자가 주간보고 취합을 시작했을 때, 느낀 점은 **"이게 너무 불편하다"**였습니다.

현재 프로세스는 이렇습니다. 팀원들이 작성한 한글 파일을 받으면, 그 안에서:
- **"차주 실행사항"** 섹션을 찾아서
- **"금주 실행사항"** 섹션을 찾아서
- 각각을 자신의 보고서에 맞게 정리해야 합니다.

그런데 여러 팀원의 파일에서 이걸 반복하다 보니, 어떤 건 차주 맞는지, 금주 맞는지 헷갈리고, 형식도 다르고, 파일도 여러 개가 됩니다. 결국 팀원 제출 → 임원 최종 확정까지 **3일이 걸립니다.**

**DAS의 핵심 아이디어는 간단합니다:**

팀원이 "금주/차주"를 신경 쓸 필요 없이, **기본 정보만 입력**하면:
- 작업시작일
- 작업완료일  
- 진행도
- 작업내용
- 변경 전/후 수행사항

**시스템이 알아서:**
- 이 정보가 "금주"인지 "차주"인지 판단 (NH 규정에 따라)
- 각 주차에 맞는 주간보고 자동 생성
- 해당 n주차 보고서에 자동 포함

결과: **형식 고민 없음, 시간 대폭 절약**

각 계층(팀장 → 부장 → 임원)도 마찬가지. "어떤 4개를 선택할지"만 판단하면, 나머지는 시스템이 자동으로 취합하고 생성합니다. **같은 날 안에 완료 가능.**

---

## Problem Statement

NH 정보시스템에서 운영업무 담당자가 주간보고 취합을 시작하면서 발견한 문제:

### 1️⃣ **복잡한 문서 표준**
- 팀원이 보고서에 "차주 실행사항 / 금주 실행사항 / 기타" 등 여러 섹션으로 나눠서 작성
- 취합자가 각 파일에서 올바른 섹션을 찾아서 정리해야 함
- 형식이 일관되지 않아서 실수가 빈번

### 2️⃣ **수작업 반복**
- 팀원 5명 → 각 1개 한글 파일 = 팀장이 5개 파일 일일이 열기
- 3계층(팀장 → 부장 → 임원) × 각 계층의 수작업 = 누적 시간 낭비

### 3️⃣ **3일 소요**
- 팀원 제출 (월) → 팀장 취합 (월~화) → 부장 취합 (화~수) → 임원 최종 (수~목)
- 각 계층이 "어떤 정보를 선택할지" 판단하는 데 시간 소요
- **당일 의사결정 불가능**

### 4️⃣ **버전 관리 불명확**
- 어느 파일이 최신인지 추적 불가
- 수정 이력이 없어서 변경 사항 파악 어려움

**근본 원인: "형식을 사람이 신경 써야 함" + "선택 과정이 수동"**

---

## Solution

### 핵심: "기본 정보만 입력하면 시스템이 형식을 자동으로 맞춰줌"

#### 팀원 관점
```
현재 (불편):
- "차주 섹션에 이건 넣고..."
- "금주 섹션에 저건 넣고..."
- 형식 고민하면서 작성

미래 (간단):
- 그냥 기본 정보만 입력 (작업시작일, 작업완료일, 진행도, 내용, 변경 전후)
- 제출
- 끝 ✓
→ 시스템이 "아, 이건 금주네" 자동 판단 (NH 규정에 따라)
```

#### 팀장/부장/임원 관점
```
현재:
- 하위 부서 파일 5-10개 열기
- 중요한 4개 선택해서 복사
- 자신의 보고서에 붙여넣기
- 형식 정리
- 3일 소요

미래:
- 한 화면에서 항목 조회
- 4개 체크박스만 선택
- 확정 버튼 클릭
- 자동으로 상위 계층에 전달 ✓
- 당일 완료
```

#### 최종 결과
```
당일 완료 ✓
형식 자동화 ✓
버전 명확화 ✓
의사결정 속도 향상 ✓
```

---

## 🎯 왜 지금 만드는가?

**운영업무 담당 후 불편함을 직접 경험**

이 프로젝트는 조직 정책 변화나 시장 요구가 아니라, **운영을 직접 담당한 사람이 느낀 불편함**에서 출발했습니다. 
- 수작업이 너무 많음
- 시간이 3일이나 걸림
- 형식 때문에 자꾸 실수됨

**"이걸 자동화하면 모두가 편하겠다"**는 판단으로 시작된 프로젝트입니다.

---

## User Stories

### 팀원 (입력자) — "형식 고민 없이 기본 정보만 입력하면 끝"

1. As a 팀원, I want to 로그인 (사번/비밀번호), so that 내 계정으로 보고서에 접근할 수 있다
2. As a 팀원, I want to 기본 정보만 입력 (시작일/완료일/진행도/내용/변경전후), so that "차주/금주" 같은 형식을 신경 쓰지 않아도 시스템이 자동으로 분류해준다
3. As a 팀원, I want to 상태(완료/계속/신규)를 선택, so that 업무의 진행 상황을 명시할 수 있다
4. As a 팀원, I want to 담당자 이름 입력, so that 업무 담당자를 명확히 할 수 있다
5. As a 팀원, I want to 작업시작일/종료일/진행도를 입력, so that 시스템이 이것으로 금주/차주를 자동 판단한다
6. As a 팀원, I want to 변경 전/후 수행사항을 입력, so that 업무의 변화를 명확히 기록할 수 있다
7. As a 팀원, I want to 입력한 보고서를 제출, so that 팀장이 검토할 수 있도록 제출할 수 있다
8. As a 팀원, I want to 제출한 보고서를 다시 수정, so that 실수를 바로잡을 수 있다
9. As a 팀원, I want to 입력 중에 오탈자 경고 표시, so that 품질을 높일 수 있다 (MVP 2순위)

### 팀장 (선택자) — "5개 파일 열기 ✗, 4개 선택만 하면 됨"

10. As a 팀장, I want to 로그인, so that 내 부서의 보고서에 접근할 수 있다
11. As a 팀장, I want to 우리 팀원들이 제출한 모든 항목을 한 화면에서 조회, so that 5개의 한글 파일을 일일이 열지 않아도 된다
12. As a 팀장, I want to 제출된 항목 중 정확히 4개를 선택 (체크박스), so that 복사·붙여넣기 수작업 없이 부장에게 자동 전달된다
13. As a 팀장, I want to 4개 선택 완료 후 "확정 제출" 버튼 활성화, so that 한 번에 확정할 수 있다
14. As a 팀장, I want to 선택한 항목의 문구를 수정, so that 최종 표현을 다듬을 수 있다 (선택사항)
15. As a 팀장, I want to 확정 후에도 항목을 다시 편집, so that 변경 사항을 반영할 수 있다 (선택사항)
16. As a 팀장, I want to 확정한 4개 항목을 DOCX 파일로 다운로드, so that 보고서를 문서로 공유할 수 있다
17. As a 팀장, I want to 선택한 항목을 HWP 파일로 다운로드, so that 한글 문서로 작성된 기존 시스템과 호환될 수 있다 (MVP 2순위)
18. As a 팀장, I want to 보고서 미리보기를 실시간으로 보기, so that 최종 결과가 어떻게 보일지 확인할 수 있다 (MVP 2순위)

### 부장/본부장 (계층별 선택자) — "팀장과 동일한 경험"

19. As a 부장, I want to 로그인, so that 우리 팀장들의 확정 항목을 조회할 수 있다
20. As a 부장, I want to 하위 팀장들이 확정한 항목들을 조회, so that 어떤 내용이 올라왔는지 확인할 수 있다
21. As a 부장, I want to 올라온 항목 중 정확히 4개를 선택 (팀장과 동일한 플로우), so that 본부장에게 보고할 내용을 결정할 수 있다
22. As a 부장, I want to 선택한 항목을 확정 및 편집, so that 최종 표현을 다듬을 수 있다
23. As a 부장, I want to 선택한 4개를 본부장에게 자동 전달, so that 상위 보고가 자동으로 진행될 수 있다

### 본부장/임원

24. As a 본부장, I want to 부장들의 항목을 조회하고 4개 선택, so that 최상위 경영진 보고를 준비할 수 있다
25. As a 임원, I want to 본부장의 항목을 조회하고 최종 4개 선택, so that 법인 보고서를 확정할 수 있다
26. As a 임원, I want to 확정한 최종 4개를 법인 보고서(DOCX/HWP)로 생성, so that 이사회에 보고할 수 있다

### 시스템 관리자

27. As a 시스템 관리자, I want to 조직도 데이터(부서/직급 등)를 JSON/SQL로 초기 입력, so that 시스템이 정상 작동할 수 있다
28. As a 시스템 관리자, I want to 계층별 선택 수를 설정(현재는 4개 고정), so that 정책 변경에 대응할 수 있다 (v2)
29. As a 시스템 관리자, I want to 사용자 역할 및 권한 관리, so that 접근 제어가 정상 작동할 수 있다 (v2)

---

## Implementation Decisions

### 아키텍처 & 기술 스택

1. **Frontend**: Next.js (App Router) + TypeScript
   - Server-side rendering과 정적 생성의 최적 조합
   - API Routes로 백엔드 통합
   - Tailwind CSS로 일관성 있는 UI

2. **Backend**: Supabase (PostgreSQL)
   - Hosted PostgreSQL 데이터베이스
   - Row Level Security (RLS)로 계층별 데이터 접근 제어
   - JWT 기반 인증 (Supabase Auth)
   - 실시간 구독 가능 (향후 확장용)

3. **문서 생성**: docx.js (Node.js) + LibreOffice CLI
   - docx.js: DOCX 생성 (MVP 필수)
   - LibreOffice: DOCX → HWP 변환 (MVP 2순위)

4. **오탈자 검출**: hunspell (MVP 2순위)
   - 한글 오탈자 실시간 감지

### 핵심: 자동 분류 로직 (금주/차주 판단)

**입력 데이터:**
```
- 작업시작일 (date_start)
- 작업완료일 (date_end)
- 진행도 (progress) - 예: "50%", "완료"
```

**자동 분류 규칙 (NH 카드본부 규정 기준):**
```
IF 작업완료일 <= 이번주 금요일
  → "금주 실행사항" (이미 진행 중이거나 완료된 항목)
ELSE IF 작업시작일 <= 이번주 금요일 < 작업완료일
  → "금주 실행사항" (진행 중)
ELSE IF 작업시작일 > 이번주 금요일
  → "차주 예정사항" (다음주 이후 예정)
```

**⚠️ 주의:**
- 이 규칙은 **카드본부 한정**
- 타 부서의 규정이 다를 수 있음 → v2에서 부서별 규칙 설정 기능 추가 예정

### 데이터 모델 (Database Schema)

```sql
-- 사용자
CREATE TABLE users (
  id UUID PRIMARY KEY,
  employee_id VARCHAR UNIQUE NOT NULL,
  password_hash VARCHAR NOT NULL,
  name VARCHAR NOT NULL,
  role VARCHAR NOT NULL,  -- team/manager/director/vp/executive
  department_id UUID REFERENCES departments(id)
);

-- 부서/조직
CREATE TABLE departments (
  id UUID PRIMARY KEY,
  name VARCHAR NOT NULL,
  type VARCHAR NOT NULL,  -- team/department/division/company
  parent_id UUID REFERENCES departments(id),
  selection_count INTEGER DEFAULT 4,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- 주간 보고서 (계층별)
CREATE TABLE weekly_reports (
  id UUID PRIMARY KEY,
  week_start DATE NOT NULL,
  department_id UUID REFERENCES departments(id),
  level VARCHAR NOT NULL,  -- team/manager/director/vp/executive
  status VARCHAR NOT NULL,  -- draft/submitted/confirmed
  created_at TIMESTAMP,
  confirmed_at TIMESTAMP
);

-- 보고서 항목 (1건)
CREATE TABLE report_items (
  id UUID PRIMARY KEY,
  report_id UUID REFERENCES weekly_reports(id),
  author_id UUID REFERENCES users(id),
  
  -- 기본정보
  title VARCHAR NOT NULL,
  status_tag VARCHAR NOT NULL,  -- 완료/계속/신규
  assignee_name VARCHAR,
  
  -- 내용
  description TEXT,
  edited_description TEXT,
  
  -- 일정 (자동 분류용)
  date_start DATE,
  date_end DATE,
  progress VARCHAR,
  
  -- 자동 분류 결과
  report_section VARCHAR,  -- 'this_week' / 'next_week' (자동 계산)
  
  -- 상태 & 롤업
  selected BOOLEAN,
  selected_at_level VARCHAR,
  selected_at_department_id UUID REFERENCES departments(id),
  approved BOOLEAN,
  item_order INTEGER,
  
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### 인증 & 권한

1. **인증**: Supabase Auth (사번 + 비밀번호)
2. **권한**: Row Level Security (RLS) 정책
   - 각 사용자는 자신의 부서 및 하위 부서 데이터만 접근 가능
   - 팀장은 팀원 보고서 조회 가능
   - 부장은 팀장 확정 항목 조회 가능

### 자동 롤업 (Rollup) 메커니즘

1. **팀원→팀장**: 팀원 항목 → 자동 분류 → 팀장의 weekly_report(level=manager)에 노출
2. **팀장→부장**: 팀장이 4개 선택 → 부장의 weekly_report(level=director)에 자동 전달
3. **부장→본부장→임원**: 동일 로직 반복 (제네릭 설계)

### API 설계

```
POST   /api/reports                    - 팀원: 새 보고서 항목 생성
GET    /api/reports                    - 하위 보고서 항목 조회
PATCH  /api/reports/:id                - 보고서 항목 수정
DELETE /api/reports/:id                - 보고서 항목 삭제

POST   /api/reports/:id/submit          - 팀원: 보고서 제출
POST   /api/reports/:id/select          - 상급자: 항목 선택 (4개)
POST   /api/reports/:id/confirm         - 상급자: 확정 제출

POST   /api/export/docx                 - DOCX 생성
POST   /api/export/hwp                  - HWP 생성 (MVP 2순위)
```

### UI 레이아웃

1. **로그인 페이지**: 사번/비밀번호 입력
2. **팀원 대시보드**:
   - 입력 폼 (기본 정보만: 시작일, 완료일, 진행도, 내용, 변경전후)
   - 작성된 보고서 목록
   - "재편집" 버튼
   
3. **팀장 대시보드**:
   - 팀원 항목 목록 (자동 분류: 금주/차주 표시)
   - 4개 선택 UI (체크박스)
   - 선택 항목 에디터 모드 (선택사항)
   - "보고서 다운로드" (DOCX/HWP)
   - "확정 제출" 버튼

4. **부장/본부장/임원 대시보드**: 팀장과 동일 (입력은 없음)

---

## Testing Decisions

### 테스트 전략

**좋은 테스트의 정의**: 외부 동작(API 응답, 데이터베이스 상태, 사용자 인터페이스)만 검증하고, 구현 세부사항(내부 함수, 중간 변수)은 건드리지 않음

### 테스트 Seams (순서대로)

1. **E2E 테스트 (최상위 seam)**: 
   - 팀원 입력 → 자동 분류 → 팀장 선택 → DOCX 생성의 전체 플로우
   - Playwright 사용
   - 실제 Supabase 데이터베이스 활용

2. **API 통합 테스트**:
   - `/api/reports` CRUD 로직
   - `/api/export/docx` 생성 로직
   - 자동 분류 로직 (date_start/date_end → report_section)
   - RLS 권한 검증

3. **데이터베이스 테스트**:
   - RLS 정책 검증
   - 자동 분류 트리거 검증
   - Rollup 로직 검증

4. **UI 컴포넌트 테스트**:
   - 입력 폼 검증 (기본 5개 필드)
   - 선택 UI (정확히 4개 선택만 활성화)
   - 에디터 모드

### 테스트할 모듈

- `api/reports/route.ts` - CRUD, 자동 분류, 권한 검증
- `api/export/route.ts` - DOCX 생성 로직
- Database triggers - 자동 분류, Rollup 자동화
- RLS policies - 계층별 접근 제어
- UI: ReportForm, ManagerSelector, ReportDownload

---

## Out of Scope

### MVP에서 제외 (v2로 미루는 것)

1. **엑셀 조직도 자동 업로드** - JSON/SQL 수동 입력으로 시작
2. **시스템 알림** - 마감/대기/완료 알림
3. **부장 이상 다계층 테스트** - 초기 설계에는 포함, 실제 테스트는 v2
4. **복잡한 입력 폼 필드** - 업무구분, 작업내용 표, 요청구분, 변경사유
5. **다음주 재활용** - 지난주 미선택 항목 자동 복사
6. **항목 선택 후 미리보기** - DOCX 생성 후는 다운로드만
7. **타 부서 자동 분류 규칙** - MVP는 카드본부 규정만 적용

### Out of Scope (범위 외)

- 이메일 알림
- 고급 필터/검색/통계
- 조직도 HR 시스템 자동 동기화
- 모바일 앱
- API 외부 공개 (내부 사용만)

---

## 📊 네러티브 요약 (Why DAS)

### 현재 상태 (AS-IS) - 수작업 3일 프로세스

```
팀원 작성 (월)
  ↓ (각자 "금주/차주" 섹션 신경 쓰며 작성)
팀원 제출 (월)
  ↓
팀장이 5개 한글 파일 열기 (월 오후 - 30분)
  ↓ (각 파일에서 "금주" "차주" 섹션 찾아서 복사)
팀장 취합 (월~화 - 1시간)
  ↓
부장이 3개 팀장 파일 열기 (화 아침 - 1시간)
  ↓ (복사·붙여넣기 반복)
부장 취합 (화~수 - 1시간)
  ↓
본부장 수령 (수 아침)
  ↓ (수작업 반복)
임원 최종 (수~목)

**총 소요: 3일 + 각 계층의 수작업 시간**
**형식 실수 빈번 / 버전 관리 불명확**
```

### 미래 상태 (TO-BE) - 당일 자동화

```
팀원 입력 (월 아침)
  → 기본 정보만 입력 (시작일, 완료일, 진행도, 내용, 변경전후)
  → 제출
  ↓ (시스템이 자동으로 분류)

팀장 화면에 자동 노출 (월 중)
  → 이미 "금주/차주" 분류됨
  → 4개 체크박스만 선택 (2분)
  → 확정
  ↓ (자동으로 부장 화면에 전달)

부장 화면에 자동 노출 (월 중)
  → 4개 체크박스만 선택 (2분)
  → 확정
  ↓ (자동으로 본부장에게 전달)

본부장 → 임원 (동일)

**당일 완료 (같은 날 저녁)**
**형식 자동화 / 버전 명확 / 시간 절약**
```

### 핵심 베팅 (우리의 차별적 판단)

- ❌ "모든 형식 옵션을 다 지원하자" → ✅ **"기본 정보 5개만, 나머지는 시스템이"**
- ❌ "각 부서의 규정을 다 지원하자" → ✅ **"카드본부 규정으로 시작, 타부서는 v2"**
- ❌ "사용자가 분류를 판단하자" → ✅ **"날짜로 자동 분류"**
- ❌ "임원을 위한 시스템" → ✅ **"실무자(팀원~부장)의 시간 절약"**

---

## Further Notes

### 개발 일정

- **Week 1 (7h)**: Supabase 스키마 + 자동 분류 로직 + Next.js 기본 구조 + 로그인
- **Week 2 (7h)**: 팀원 입력 폼 (기본 5개 필드) + CRUD
- **Week 3 (7h)**: 팀장 선택 + DOCX 생성
- **Total**: 21시간 (3주 × 1시간/day)

### 성공 기준

**7/15에 다음이 완벽하게 작동하면 성공:**
1. 팀원이 기본 정보만 입력 → 제출 → 자동으로 "금주/차주" 분류
2. 팀장이 팀원의 4개 항목 선택 → 확정 → 부장 화면에 자동 노출
3. 팀장이 "보고서 다운로드" 클릭 → DOCX 파일 생성
4. 엑셀 없이도 조직도 데이터 기본 설정 가능

### 리스크 대응

1. **시간 부족**: MVP 필수만 집중 (오탈자, HWP는 v2)
2. **기술 학습**: 첫 주부터 튜토리얼 + 프로젝트 병행
3. **자동 롤업**: 팀원→팀장만 완벽히, 나머지는 UI 복사
4. **HWP 변환**: DOCX만 하기 (LibreOffice는 v2)
5. **다부서 규정**: MVP는 카드본부만 지원, 타부서는 v2에서 설정 기능 추가

### 다음 단계

1. GitHub Issues로 구체적 작업 분해 (`/to-issues final_spec.md`)
2. CONTEXT.md 작성 (프로젝트 도메인) ✅ 완료
3. Supabase 프로젝트 생성 & 초기 데이터 입력
4. Next.js 스캐폴딩 시작
