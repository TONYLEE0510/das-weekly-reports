# DAS (Document Automatic System) MVP PRD

## Problem Statement

NH 정보시스템에서 주간업무보고서를 수기(오프라인)로 작성하고 있습니다. 각 계층(팀원 → 팀장 → 부장 → 본부장 → 임원)별로 정보를 취합하는 프로세스가 복잡하고 관리가 어렵습니다. 보고서 버전 관리가 명확하지 않고, 진행상황을 추적하기 어려워 조직 전체의 보고 문화가 비효율적입니다.

## Solution

주간보고 프로세스를 완전히 디지털화하고, 계층별로 자동 롤업(roll-up)되는 웹 애플리케이션을 구축합니다. 팀원이 입력한 보고 항목들을 팀장이 자동으로 4개 선택하면, 이것이 다음 상위 계층(부장, 본부장, 임원)으로 자동 전달되는 방식입니다. 최종적으로 경영진이 확정한 4개 항목이 법인 보고서로 자동 생성됩니다.

**핵심 가치:**
- 버전 관리 명확화
- 계층별 취합 프로세스 자동화
- 진행상황 투명성 확보

## User Stories

### 팀원 (입력자)
1. As a 팀원, I want to 로그인 (사번/비밀번호), so that 내 계정으로 보고서에 접근할 수 있다
2. As a 팀원, I want to 주간보고 입력 폼에 업무제목 입력, so that 이번 주 업무를 기록할 수 있다
3. As a 팀원, I want to 상태(완료/계속/신규)를 선택, so that 업무의 진행 상황을 명시할 수 있다
4. As a 팀원, I want to 담당자 이름 입력, so that 업무 담당자를 명확히 할 수 있다
5. As a 팀원, I want to 업무설명(상세 내용) 입력, so that 업무의 세부사항을 기록할 수 있다
6. As a 팀원, I want to 시작일/종료일 선택, so that 업무의 예상 기간을 기록할 수 있다
7. As a 팀원, I want to 진행현황(예: 개발 10%) 입력, so that 업무의 현재 진행도를 반영할 수 있다
8. As a 팀원, I want to 입력한 보고서를 제출, so that 팀장이 검토할 수 있도록 제출할 수 있다
9. As a 팀원, I want to 제출한 보고서를 다시 수정, so that 실수를 바로잡을 수 있다
10. As a 팀원, I want to 입력 중에 오탈자 경고 표시, so that 품질을 높일 수 있다 (MVP 2순위)

### 팀장 (선택자)
11. As a 팀장, I want to 로그인, so that 내 부서의 보고서에 접근할 수 있다
12. As a 팀장, I want to 우리 팀원들이 제출한 모든 항목을 조회, so that 어떤 내용이 제출됐는지 확인할 수 있다
13. As a 팀장, I want to 제출된 항목 중 정확히 4개를 선택 (체크박스), so that 최상위 관리자에게 보고할 중요 사항을 결정할 수 있다
14. As a 팀장, I want to 4개 선택 완료 후 "확정 제출" 버튼 활성화, so that 선택을 확정할 수 있다
15. As a 팀장, I want to 선택한 항목의 문구를 수정, so that 최종 표현을 다듬을 수 있다 (선택사항)
16. As a 팀장, I want to 확정 후에도 항목을 다시 편집, so that 변경 사항을 반영할 수 있다 (선택사항)
17. As a 팀장, I want to 확정한 4개 항목을 DOCX 파일로 다운로드, so that 보고서를 문서로 공유할 수 있다
18. As a 팀장, I want to 선택한 항목을 HWP 파일로 다운로드, so that 한글 문서로 작성된 기존 시스템과 호환될 수 있다 (MVP 2순위)
19. As a 팀장, I want to 보고서 미리보기를 실시간으로 보기, so that 최종 결과가 어떻게 보일지 확인할 수 있다 (MVP 2순위)

### 부장/본부장/임원 (계층별 선택자)
20. As a 부장, I want to 로그인, so that 우리 팀장들의 확정 항목을 조회할 수 있다
21. As a 부장, I want to 하위 팀장들이 확정한 항목들을 조회, so that 어떤 내용이 올라왔는지 확인할 수 있다
22. As a 부장, I want to 올라온 항목 중 정확히 4개를 선택 (팀장과 동일한 플로우), so that 본부장에게 보고할 내용을 결정할 수 있다
23. As a 부장, I want to 선택한 항목을 확정 및 편집, so that 최종 표현을 다듬을 수 있다
24. As a 부장, I want to 선택한 4개를 본부장에게 자동 전달, so that 상위 보고가 자동으로 진행될 수 있다

### 본부장/임원
25. As a 본부장, I want to 부장들의 항목을 조회하고 4개 선택, so that 최상위 경영진 보고를 준비할 수 있다
26. As a 임원, I want to 본부장의 항목을 조회하고 최종 4개 선택, so that 법인 보고서를 확정할 수 있다
27. As a 임원, I want to 확정한 최종 4개를 법인 보고서(DOCX/HWP)로 생성, so that 이사회에 보고할 수 있다

### 시스템 관리자
28. As a 시스템 관리자, I want to 조직도 데이터(부서/직급 등)를 JSON/SQL로 초기 입력, so that 시스템이 정상 작동할 수 있다
29. As a 시스템 관리자, I want to 계층별 선택 수를 설정(현재는 4개 고정), so that 정책 변경에 대응할 수 있다 (v2)
30. As a 시스템 관리자, I want to 사용자 역할 및 권한 관리, so that 접근 제어가 정상 작동할 수 있다 (v2)

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
  
  -- 일정
  date_start DATE,
  date_end DATE,
  progress VARCHAR,
  
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

1. **팀원→팀장**: 팀원 항목 4개 선택 → weekly_reports (level=manager)에 저장
2. **팀장→부장**: 팀장 확정 항목 4개 → weekly_reports (level=director)에 자동 전달
3. **부장→본부장→임원**: 동일 로직 반복 (제네릭 설계)

**Key Decision**: `selected` / `selected_at_level` / `selected_at_department_id` 필드로 어느 계층에서 선택됐는지 추적

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
   - 입력 폼 (필드 최소화)
   - 작성된 보고서 목록
   - "재편집" 버튼
   
3. **팀장 대시보드**:
   - 팀원 항목 목록 (읽기 전용)
   - 4개 선택 UI (체크박스)
   - 선택 항목 에디터 모드 (선택사항)
   - "보고서 다운로드" (DOCX/HWP)
   - "확정 제출" 버튼

4. **부장/본부장/임원 대시보드**: 팀장과 동일 (입력은 없음)

## Testing Decisions

### 테스트 전략

**좋은 테스트의 정의**: 외부 동작(API 응답, 데이터베이스 상태, 사용자 인터페이스)만 검증하고, 구현 세부사항(내부 함수, 중간 변수)은 건드리지 않음

### 테스트 Seams (순서대로)

1. **E2E 테스트 (최상위 seam)**: 
   - 팀원 입력 → 팀장 선택 → DOCX 생성의 전체 플로우
   - Playwright 사용
   - 실제 Supabase 데이터베이스 활용

2. **API 통합 테스트**:
   - `/api/reports` CRUD 로직
   - `/api/export/docx` 생성 로직
   - RLS 권한 검증

3. **데이터베이스 테스트**:
   - RLS 정책 검증
   - Rollup 로직 검증
   - 트리거 검증

4. **UI 컴포넌트 테스트**:
   - 입력 폼 검증
   - 선택 UI (정확히 4개 선택만 활성화)
   - 에디터 모드

### 테스트할 모듈

- `api/reports/route.ts` - CRUD, 권한 검증
- `api/export/route.ts` - DOCX 생성 로직
- Database triggers - Rollup 자동화
- RLS policies - 계층별 접근 제어
- UI: ReportForm, ManagerSelector, ReportDownload

### 선행 사례

- Next.js API Routes 테스트: Supabase 클라이언트 테스트 패턴
- React 컴포넌트 테스트: Testing Library 패턴
- E2E: Playwright로 실제 브라우저 테스트

## Out of Scope

### MVP에서 제외 (v2로 미루는 것)

1. **엑셀 조직도 자동 업로드** - JSON/SQL 수동 입력으로 시작
2. **시스템 알림** - 마감/대기/완료 알림
3. **부장 이상 다계층 테스트** - 초기 설계에는 포함, 실제 테스트는 v2
4. **복잡한 입력 폼 필드** - 업무구분, 작업내용 표, 요청구분, 변경사유
5. **다음주 재활용** - 지난주 미선택 항목 자동 복사
6. **항목 선택 후 미리보기** - DOCX 생성 후는 다운로드만

### Out of Scope (범위 외)

- 이메일 알림
- 고급 필터/검색/통계
- 조직도 HR 시스템 자동 동기화
- 모바일 앱
- API 외부 공개 (내부 사용만)

## Further Notes

### 개발 일정

- **Week 1 (7h)**: Supabase 스키마 + Next.js 기본 구조 + 로그인
- **Week 2 (7h)**: 팀원 입력 폼 + CRUD
- **Week 3 (7h)**: 팀장 선택 + DOCX 생성
- **Total**: 21시간 (3주 × 1시간/day)

### 성공 기준

**7/15에 다음이 완벽하게 작동하면 성공:**
1. 팀원이 입력 폼에 항목 작성 → 제출
2. 팀장이 팀원의 4개 항목 선택 → 확정
3. 팀장이 "보고서 다운로드" 클릭 → DOCX 파일 생성
4. 엑셀 없이도 조직도 데이터 기본 설정 가능

### 리스크 대응

1. **시간 부족**: MVP 필수만 집중 (오탈자, HWP는 v2)
2. **기술 학습**: 첫 주부터 튜토리얼 + 프로젝트 병행
3. **자동 롤업**: 팀원→팀장만 완벽히, 나머지는 UI 복사
4. **HWP 변환**: DOCX만 하기 (LibreOffice는 v2)

### 다음 단계

1. GitHub Issues로 구체적 작업 분해 (`/to-issues final_spec.md`)
2. CONTEXT.md 작성 (프로젝트 도메인)
3. Supabase 프로젝트 생성 & 초기 데이터 입력
4. Next.js 스캐폴딩 시작
