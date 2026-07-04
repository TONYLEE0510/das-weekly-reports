# DAS MVP - 구현 로드맵

## 🎯 전략

**목표**: 3주 × 1시간/day = 21시간으로 MVP 완성  
**원칙**: 수직 슬라이스 (tracer bullet) - 각 단계마다 E2E 동작

---

## 📅 Week 1: Foundation (7시간)

### Day 1-2 (2시간) - #31: Supabase 스키마 설계

**목표**: DB 생성 + RLS 기본 설정

```sql
-- 필수 테이블
users          -- 사용자 (사번, 이름, 역할, 부서)
departments    -- 조직 구조 (계층 구조)
weekly_reports -- 주간보고 컨테이너
report_items   -- 보고서 항목 (제목, 설명, 상태)
```

**Check**:
- [ ] Supabase 프로젝트 생성
- [ ] 4개 테이블 생성
- [ ] RLS 기본 정책 (user_id 기반)
- [ ] 관계 정의 (FK)

---

### Day 2-3 (2시간) - #32: Next.js + Supabase Middleware

**목표**: 프로젝트 기본 구조 + 인증 미들웨어

```
app/
  ├── (auth)/login/          ← 공개
  ├── (app)/dashboard/       ← 보호됨
  │   ├── team-member/
  │   ├── manager/
  │   └── reports/
  ├── api/
  │   ├── auth/
  │   ├── items/
  │   └── reports/
  └── layout.tsx

lib/
  ├── supabase/
  ├── auth.ts
  └── types.ts
```

**Check**:
- [ ] Next.js 14 (App Router) + TypeScript
- [ ] Supabase 클라이언트 초기화
- [ ] 인증 미들웨어
- [ ] 보호된 라우트 설정
- [ ] Tailwind CSS 구성

---

### Day 3-4 (2시간) - #33: 로그인

**목표**: Supabase Auth 통합 + JWT 쿠키

```
Flow:
사번 + 비밀번호 입력
  ↓
Supabase Auth API 호출
  ↓
JWT 토큰 (httpOnly 쿠키)
  ↓
대시보드 리다이렉트
```

**Check**:
- [ ] 로그인 폼 UI
- [ ] Supabase Auth 호출
- [ ] 에러 처리 (계정 없음, 비번 오류 등)
- [ ] 로그아웃
- [ ] 보호된 라우트 접근 테스트

---

### Day 5 (1시간) - #34: 조직도 로드

**목표**: 초기 조직도 데이터 준비 & 로드

```json
// sample-org.json
{
  "departments": [
    { "id": "dept-001", "name": "팀 A", "type": "team", "parent_id": "dept-hq" },
    { "id": "dept-002", "name": "팀 B", "type": "team", "parent_id": "dept-hq" },
    { "id": "dept-hq", "name": "HQ", "type": "company", "parent_id": null }
  ],
  "users": [
    { "employee_id": "E001", "name": "김팀원", "role": "team_member", "dept_id": "dept-001" },
    { "employee_id": "M001", "name": "이팀장", "role": "manager", "dept_id": "dept-hq" }
  ]
}
```

**Check**:
- [ ] 샘플 JSON 작성 (5팀, 3계층)
- [ ] Supabase에 로드 (SQL 또는 Admin API)
- [ ] 계층 구조 검증
- [ ] 로그인 후 users 테이블 조회 가능 확인

**Week 1 누적**: 7시간 ✅

---

## 📝 Week 2: Team Member Input (7시간)

### Day 1-2 (2시간) - #35: 팀원 입력 폼 UI

**목표**: 최소화된 폼 필드 (7개)

```
┌─────────────────────────────┐
│ 주간보고 작성               │
├─────────────────────────────┤
│ 업무제목* [________]         │
│ 상태*      [완료 ▼]          │
│ 담당자*    [________]        │
│ 설명*      [큰 텍스트창]     │
│ 시작일     [YYYY-MM-DD]      │
│ 종료일     [YYYY-MM-DD]      │
│ 진행현황   [개발 50%]        │
├─────────────────────────────┤
│  [취소]  [제출]             │
└─────────────────────────────┘
```

**Check**:
- [ ] 폼 UI 구현 (React Hook Form 또는 수동)
- [ ] 유효성 검사 (필드 필수 확인)
- [ ] 반응형 (Tailwind)
- [ ] 스타일 (깔끔한 디자인)

---

### Day 2-3 (2시간) - #36: 팀원 CRUD API

**목표**: 항목 생성/조회/수정/삭제 + DB

```
POST   /api/items              Create
GET    /api/items?week=...     List (자신의 항목만)
PATCH  /api/items/:id          Update
DELETE /api/items/:id          Delete
```

**DB 흐름**:
```
POST /api/items
  ↓
1. weekly_reports 생성 (level='team', status='draft')
2. report_items 생성 (report_id, author_id, title, ...)
3. RLS: 팀원 자신의 항목만 조회 가능
```

**Check**:
- [ ] API 엔드포인트 구현
- [ ] Supabase RLS (팀원 자신의 항목만)
- [ ] 에러 처리 (권한 없음 등)
- [ ] 항목 목록 조회 UI

---

### Day 4-5 (2시간) - #37: 제출 & 상태 관리

**목표**: draft → submitted 상태 전환

```
상태 전환:
draft (작성 중)
  ↓ [제출 버튼]
submitted (제출됨)
  ↓ [재편집 버튼]
draft (다시 수정 가능)
  ↓ [제출 버튼]
submitted (확정됨)
```

**UI**:
- 항목 목록: 상태별 필터링
- 각 항목: [편집] [삭제] [제출] 또는 [재편집] 버튼

**Check**:
- [ ] 항목 목록 조회 화면
- [ ] 제출 버튼 (status 변경)
- [ ] 재편집 버튼 (draft 복원)
- [ ] 삭제 기능
- [ ] 상태별 UI 변화

**Week 2 누적**: 7 + 7 = 14시간 ✅

---

## 📊 Week 3: Manager Selection & Export (7시간)

### Day 1-2 (2시간) - #38: 팀장 선택 화면 UI

**목표**: 체크박스로 정확히 4개 선택

```
┌──────────────────────────────┐
│ 선택: 3/4                    │
├──────────────────────────────┤
│ ☐ 김팀원의 항목 1           │
│ ☑ 김팀원의 항목 2           │
│ ☑ 이팀원의 항목 1           │
│ ☑ 이팀원의 항목 3           │
├──────────────────────────────┤
│  [확정 제출 버튼 - 활성화]   │
└──────────────────────────────┘
```

**Check**:
- [ ] 하위 팀 항목 조회
- [ ] 체크박스 선택/해제
- [ ] 카운터 표시 (3/4)
- [ ] 버튼 활성화 (정확히 4개)
- [ ] 선택 완료 메시지

---

### Day 3-4 (2시간) - #39: 선택 항목 DB + 자동 롤업

**목표**: selected=true 마킹 + 제네릭 설계

```
팀장 확정 시:
1. weekly_reports 생성 (level='manager', status='confirmed')
2. report_items 업데이트 (selected=true)
3. 부장이 조회할 수 있도록 RLS 설정
4. 부장 선택 화면에 자동 표시 (동일 UI)

제네릭 설계:
SelectionScreen.tsx (level prop로 동작 변경)
  ├─ level='manager' → 팀원 항목 표시
  ├─ level='director' → 팀장 항목 표시
  └─ level='vp' → 부장 항목 표시
```

**Check**:
- [ ] 선택 항목 저장 API
- [ ] weekly_reports (level 동적)
- [ ] selected=true 마킹
- [ ] RLS (다음 계층 접근)
- [ ] 다음 계층 UI에 표시 확인

---

### Day 5 (1시간) - #40: DOCX 생성 & 다운로드

**목표**: docx.js로 4개 항목 → DOCX

```
GET /api/export/docx/:reportId
  ↓
1. report_items 조회 (selected=true, 4개)
2. docx.js로 Document 생성
3. 템플릿 적용 (제목, 여백, 스타일)
4. 동적 콘텐츠 삽입
5. 바이너리 응답 (application/vnd.openxmlformats-officedocument.wordprocessingml.document)
```

**Check**:
- [ ] docx.js 설치
- [ ] DOCX 템플릿 (간단한 형식)
- [ ] 4개 항목 데이터 삽입
- [ ] 엔드포인트 구현
- [ ] 다운로드 테스트 (파일 열기)

---

### 다음 일정 - #41: E2E 통합 테스트 (병렬, 수정 필요 시)

**목표**: MVP 5단계 플로우 검증

```
1. 팀원 로그인 ✅
2. 보고서 5개 작성 → 4개 제출 ✅
3. 팀장 로그인 ✅
4. 팀원 4개 항목 조회 ✅
5. 4개 선택 → 확정 ✅
6. "보고서 다운로드" → DOCX 받음 ✅
7. DOCX 열기 → 4개 항목 확인 ✅
```

**Week 3 누적**: 14 + 7 = **21시간 (MVP 완료)** ✅

---

## 🔄 시간 남으면 - MVP 2순위 (5시간)

### Priority 1: #42 에디터 모드 (1시간)
- 선택된 항목 텍스트 수정 가능
- edited_description 저장
- 확정 후에도 재편집 가능

### Priority 2: #43 오탈자 검출 (1.5시간)
- hunspell 라이브러리 통합
- 입력폼에서 실시간 검출
- 빨간 밑줄 표시

### Priority 3: #44 HWP 미리보기 (1.5시간)
- 좌측: 입력/선택 폼
- 우측: HWP 스타일 미리보기
- 실시간 동기화

### Priority 4: #45 DOCX → HWP 변환 (1시간)
- LibreOffice CLI 통합
- 변환 엔드포인트
- 로컬 개발 전용 (Vercel에서는 작동 안 함)

---

## 🏛️ Week 3 이후 - 부장+ & v2

### Phase 1: 부장+ 다계층 (10시간)
- #46 부장/본부장/임원 UI (SelectionScreen 재사용)
- #47 다계층 자동 롤업 (팀원 → 팀장 → ... → 임원)

### Phase 2: 대시보드 & 관리자 (8시간)
- #48 메인 대시보드 (역할별)
- #49 관리자 화면 (CRUD)
- #50 주간 선택 화면

### Phase 3: 품질 & 보안 (8시간)
- #51 데이터 검증 & 에러 처리
- #52 반응형 디자인
- #53 접근성 (WCAG)
- #54 보안 강화

### Phase 4: v2 기능 (선택)
- #55-61 v2 기능들 (시간 남으면)

---

## 🎯 핵심 원칙

### 1. 수직 슬라이스 (Tracer Bullets)
✅ 각 단계는 **완전한 E2E 흐름**을 포함
- 폼 → API → DB → 화면 반영

### 2. 제네릭 설계
✅ 부장~임원을 위해 처음부터 확장성 고려
- SelectionScreen: level prop으로 동작 변경
- RLS: 계층별 자동 필터링

### 3. 시간 관리
✅ 정확히 1시간/day × 21일
- MVP 필수: 21시간 (고정)
- 2순위: 시간 남으면 (5시간)

### 4. 단순성
✅ MVP는 최소 기능만
- 엑셀 업로드 없음 (JSON 수동)
- 알림 없음 (UI만)
- 히스토리 없음 (최신 버전만)

---

## 📊 의존성 그래프

```
#31 Supabase
  ├── #32 Next.js
  │   ├── #33 Login
  │   │   ├── #35 Form UI
  │   │   │   └── #36 CRUD
  │   │   │       └── #37 Submit
  │   │   │           └── #38 Manager UI
  │   │   │               └── #39 Rollup
  │   │   │                   └── #40 DOCX
  │   │   │                       └── #41 E2E
  │   │   └── #48 Dashboard
  │   └── #34 Org Load
  │       └── #49 Admin Screen
  
#35 Form → #42 Editor
       └── #43 Spell-check
           
#38 Manager UI → #44 Preview
                  
#40 DOCX → #45 HWP Convert

#38 Manager UI → #46 Multi-level UI
                   └── #47 Rollup & Export
```

---

## ✅ Success Criteria

### MVP (21시간)
- [ ] 팀원이 입력폼에서 보고서 작성 → 제출
- [ ] 팀장이 팀원 항목 조회 → 4개 선택 → 확정
- [ ] 팀장이 "다운로드" 클릭 → DOCX 파일 다운로드
- [ ] DOCX 파일 열기 → 4개 항목 올바르게 표시
- [ ] 권한 검증 (팀원/팀장 각각 다른 화면)

### MVP 2순위 (5시간)
- [ ] 에디터 모드 작동
- [ ] 오탈자 검출 (한글)
- [ ] HWP 미리보기
- [ ] DOCX → HWP 변환 (로컬 테스트)

### 부장+ (이후)
- [ ] 부장/본부장/임원 선택 화면 동작
- [ ] 자동 롤업 (팀원 → 임원)
- [ ] 임원 최종 보고서 생성

---

**작성자**: Claude Code  
**생성 일시**: 2026-06-24  
**최종 수정**: 2026-06-24
