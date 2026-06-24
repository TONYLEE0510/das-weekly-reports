# DAS (Document Automatic System) MVP Spec

> NH 정보시스템 · 주간업무 보고 자동화 시스템
> 작성일: 2026.06.16

---

## 📋 1. 문제 정의

**현재 상황:**
- 주간보고를 수기(오프라인)로 작성 중
- 각 계층(팀원 → 팀장 → 부장 → 본부장 → 임원)별 취합 과정이 복잡하고 관리 어려움
- 보고서 버전 관리, 진행상황 추적 불명확

**해결할 문제:**
주간보고의 전체 프로세스를 디지털화하고, 계층별 자동 롤업 시스템으로 **효율적인 보고 문화 구축**

---

## 👥 2. 핵심 사용자 (페르소나)

| 사용자 | 역할 | 주요 작업 |
|--------|------|---------|
| **팀원** | 1순위 사용자 | 주간보고 항목 작성 |
| **팀장/부장/본부장/임원** | 상급자 | 하위 보고서 조회 → 4개 선택 → 확정 |

---

## 🎯 3. 핵심 기능 (MVP)

### 3-1. 팀원 입력 폼
- ✅ 주간보고 항목 CRUD (생성/조회/수정/삭제)
- ✅ 필드:
  - 기본정보: 업무구분, 금주/차주, 업무제목, 상태(완료/계속/신규), 담당자
  - 내용: 업무설명, 작업내용 표(선택적 — 현행/변경후 or 작업내용)
  - 일정: 요청구분, 시작일~종료일, 완료일/예정일, 진행현황, 변경사유
- ✅ 임시저장 / 제출 기능
- ✅ **제출 후에도 언제든 수정 가능** (확정 전/후 모두 수정 가능)
- ✅ 다음주 주간보고 작성 시 **재활용 가능** (지난주 미선택 항목 참고/복사)

### 3-2. 계층별 선택·확정 화면 (자동 롤업)
- ✅ **조직도 기반 자동 롤업**: 팀원 → 팀장 → 부장 → 본부장 → 임원
  - 하위 계층이 항목을 선택·확정하면 자동으로 상위 계층 화면에 표시
  - 각 계층은 자신이 선택한 항목만 조회/수정 가능
- ✅ **계층별 항목 선택**: 
  - 하위 부서의 확정 항목 전체 카드 표시
  - 체크박스로 선택 (최소 4개, 계층별로 다를 수 있음)
  - 선택 완료 시 "확정 제출" 버튼 활성화
- ✅ **선택 후 문구 수정 가능**:
  - 각 계층이 선택한 항목의 문구를 자신의 레벨에서 수정 가능
  - 상위 계층으로 올라갈 때 원문 또는 수정된 문구 전달
  - 확정 후에도 계속 수정 가능
- ✅ **하위 항목 유지**: 
  - 선택되지 않은 항목은 팀원의 개별 기록에만 남음
  - 다음주 재활용 시 참고 가능

### 3-3. 보고서 생성 및 다운로드
- ✅ **계층별 보고서** (사내 보고용):
  - 각 계층이 선택·확정한 항목들로 구성된 보고서 자동 생성
  - 팀장 보고서, 부장 보고서, 본부장 보고서 등 별도 문서
- ✅ **최종 보고서** (법인 보고용):
  - 임원이 선택·확정한 항목(최소 4개)으로 구성
  - 전사 주간보고서로 대외 제출
- ✅ **DOCX 다운로드** (이후 HWP 변환 가능)
  - 실제 보고 양식 형태로 렌더링된 미리보기
- ✅ **팀원 개별 기록** (재활용용):
  - 팀원이 작성한 전체 항목(선택/미선택 상관없이) 저장
  - 다음주 참고/재활용 가능

### 3-4. 로그인
- ✅ 사번 / 비밀번호 입력
- ✅ Supabase Auth 기반

### 3-5. 시스템 관리자 화면
- ✅ **엑셀 조직도 관리**:
  - 엑셀 템플릿 다운로드 (사번, 이름, 부서, 역할, 상위부서)
  - 엑셀 업로드 → 자동으로 조직도 및 사용자 정보 동기화
  - 변경 사항 즉시 반영
- ✅ **계층별 선택 수 설정**:
  - 각 계층(팀장/부장/본부장/임원)이 선택해야 할 항목 수 설정
  - 기본값: 4개 (필요시 조정 가능)
- ✅ **사용자 역할 관리**:
  - 엑셀 동기화 시 자동 할당 (또는 수동 수정)

### 3-6. 시스템 알림
- ✅ 주간보고 작성 마감 알림 (매주 수요일 18:00)
- ✅ 상위 계층 확정 대기 알림 (하위가 제출했을 때)
- ✅ 확정 완료 알림

---

## 🚫 4. 제외 범위 (이번 MVP에서는 안 함)

- ❌ 부장 이상 계층 확장 (MVP는 팀원→팀장, 추가 2주에서 부장~임원)
- ❌ 회의일정, 추진예정업무 등 추가 정보 섹션 (v2에서 추가)
- ❌ 이메일 알림 (시스템 알림만 제공)
- ❌ 고급 필터/검색/통계 기능 (v2에서)
- ❌ 조직도 자동 동기화 (HR 시스템 연동 없음, 엑셀 수동 업로드만)
- ❌ 모바일 앱 (웹만)

---

## ✅ 5. 성공 기준 

### MVP (1개월) - 팀원 → 팀장 단계
**"다음 엔드투엔드 플로우가 완벽하게 동작하면 성공"**
1. 팀원이 주간보고 항목 작성 & 제출
2. 팀장이 하위 항목 조회 & 4개 선택 & 확정
3. 팀장 보고서를 HWP로 다운로드
4. 조직도/권한 관리자 화면에서 기본 설정 가능

### 추가 2주 - 부장 → 임원 단계
5. 팀장이 확정한 항목이 자동으로 부장 화면에 롤업
6. 부장 → 본부장 → 임원이 동일한 플로우로 진행
7. 임원이 확정한 최종 4개가 법인 보고서로 생성
8. **조직이 실제로 사용하면서 만족도를 느낌**
   - 버전 관리 명확화
   - 계층별 취합 프로세스 자동화
   - 진행상황 투명성 확보

---

## 🛠️ 6. 기술 스택

| 항목 | 선택 | 비고 |
|------|------|------|
| **프레임워크** | Next.js (App Router) | TypeScript 필수 |
| **DB** | Supabase (PostgreSQL) | 인증도 Supabase 사용 |
| **배포** | Vercel | Next.js 최적화 |
| **문서 출력** | docx.js | DOCX 다운로드 |
| **UI 스타일** | Tailwind CSS | 기존 프로젝트 기술 스택 준용 |

---

## 📊 7. DB 스키마 (필수 테이블)

```sql
-- 사용자
CREATE TABLE users (
  id UUID PRIMARY KEY,
  employee_id VARCHAR UNIQUE NOT NULL,  -- 사번
  password_hash VARCHAR NOT NULL,
  name VARCHAR NOT NULL,
  role VARCHAR NOT NULL,  -- team/manager/director/vp/executive
  department_id UUID REFERENCES departments(id)
);

-- 부서
CREATE TABLE departments (
  id UUID PRIMARY KEY,
  name VARCHAR NOT NULL,
  type VARCHAR NOT NULL,  -- team/department/division/company
  parent_id UUID REFERENCES departments(id),  -- 상위 부서
  selection_count INTEGER DEFAULT 4,  -- 이 계층에서 선택할 항목 수 (기본 4)
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- 주간보고 (주차별 묶음)
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
  category VARCHAR NOT NULL,  -- 업무구분
  section VARCHAR NOT NULL,  -- 금주/차주
  title VARCHAR NOT NULL,  -- 업무제목
  status_tag VARCHAR NOT NULL,  -- 완료/계속/신규
  assignee_name VARCHAR,
  assignee_role VARCHAR,
  
  -- 내용
  description TEXT,  -- 업무설명 (원문)
  edited_description TEXT,  -- 각 계층에서 수정된 문구 (JSON으로 level별 저장)
  
  -- 일정
  request_type VARCHAR,  -- 자체개선/부서요청
  wor_number VARCHAR,
  date_start DATE,
  date_end DATE,
  complete_date DATE,
  complete_date_changed BOOLEAN,
  complete_date_reason TEXT,
  progress VARCHAR,  -- 개발(10%) 등
  
  -- 상태 & 롤업
  selected BOOLEAN,  -- 선택 여부
  selected_at_level VARCHAR,  -- 선택된 계층 (team/department/division 등)
  selected_at_department_id UUID REFERENCES departments(id),  -- 선택한 부서
  approved BOOLEAN,  -- 확정 여부
  item_order INTEGER,  -- 각 계층에서의 순번
  
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- 항목 내 작업내용 표 (선택적)
CREATE TABLE report_item_tables (
  id UUID PRIMARY KEY,
  item_id UUID REFERENCES report_items(id),
  row_order INTEGER,
  col_label VARCHAR,  -- "현행" or "변경후" or "작업내용"
  content TEXT,
  created_at TIMESTAMP
);
```

---

## 📅 8. 개발 일정 (1개월 + 2주)

### MVP (1개월) - 팀원 → 팀장
| 주차 | 마일스톤 | 작업 |
|------|---------|------|
| **1주** | 기반 구축 | DB 설계 및 Supabase 구성 (조직도, 권한, 자동롤업 기반), 로그인 UI/로직 |
| **2주** | 팀원 입력 | 입력 폼 UI, CRUD 로직, 임시저장/제출, 수정 기능 |
| **3주** | 팀장 취합 | 팀장 화면 UI, 자동 롤업, 선택/수정/확정 로직, 보고서 생성 |
| **4주** | 관리자 & 완성 | 관리자 화면 (엑셀 업로드), DOCX 다운로드, 시스템 알림, 통합 테스트 |

### 추가 (2주) - 부장 → 임원
| 주차 | 마일스톤 | 작업 |
|------|---------|------|
| **5주** | 계층 확장 | 부장/본부장 화면 UI, 계층별 선택 수 관리, 자동 롤업 검증 |
| **6주** | 최종 완성 | 임원 화면 UI, 법인 보고서 생성, E2E 테스트, 사용성 개선 |

---

## 🎯 9. v2 계획 (Out of Scope)

### MVP 후 계획 (2주 후)
- ✅ 부장/본부장/임원 취합 화면 확장 (예정)
- ✅ 각 계층별 선택 수 커스터마이징 (동적 변경)

### v2 이후
- 고급 검색/필터/통계 (보고서 분석)
- HR 시스템 자동 동기화 (엑셀 수동 → API 자동)
- 회의일정, 추진예정업무 섹션 추가
- 메일 알림 연동
- 모바일 앱
- API 문서화 및 외부 연동

---

## 📌 10. 결정 사항 & 주의사항

### 확정된 사항
- ✅ **자동 롤업**: 하위 계층이 선택하면 자동으로 상위 계층에 올라감
- ✅ **선택 후 문구 수정 가능**: 각 계층에서 자신의 레벨에서만 수정
- ✅ **확정 후에도 수정 가능**: 언제든 수정 가능 (추적 불필요)
- ✅ **엑셀 조직도 관리**: 관리자가 엑셀 업로드 → 자동 반영
- ✅ **초기 선택 수**: 모든 계층 4개 (추후 조정 가능)
- ✅ **팀원 개별 기록 유지**: 미선택 항목도 시스템에 남음
- ✅ **일정**: MVP 1개월(팀원→팀장) + 추가 2주(부장~임원)

### 앞으로 결정 필요
- [ ] HWP 양식 정확한 템플릿 (현재 설계문서 참고, 추후 확정)
- [ ] 사원 정보 마스터 데이터 (어디서 import?)
- [ ] 계층별 권한 매핑 규칙 (자동 vs 수동)
