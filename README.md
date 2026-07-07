# DAS (Document Automatic System) - 주간업무보고 자동화 시스템

> NH 정보시스템을 위한 주간보고 자동화 플랫폼
> **상태**: MVP 개발 중 (2026.06.24 ~ 7/15)

## 🎯 프로젝트 개요

주간보고를 **수기 작성에서 디지털화**하고, **계층별 자동 롤업 시스템**으로 효율적인 보고 문화를 구축합니다.

### 현재 문제
- 주간보고를 오프라인에서 수기로 작성
- 팀원 → 팀장 → 부장 → 본부장 → 임원 단계별 취합 프로세스가 복잡
- 보고서 버전 관리 및 진행상황 추적 불명확

### 해결책
1. **팀원**: 입력 폼에서 주간보고 작성 & 제출
2. **팀장**: 팀원 항목 중 4개 선택 & 확정
3. **자동 롤업**: 팀장 선택 → 부장 화면에 자동 전달
4. **최종**: 임원 확정 4개 → 법인 보고서 자동 생성

---

## 📚 문서

| 문서 | 용도 |
|------|------|
| **[final_spec.md](./final_spec.md)** | 📋 전체 MVP 스펙 (기능, 일정, 리스크) |
| **[tech.md](./tech.md)** | 🔧 기술 스택 연구 (Next.js, Supabase, docx.js) |
| **[DAS-MVP-PRD.md](./DAS-MVP-PRD.md)** | 📊 PRD (30 user stories, 구현 결정사항) |
| **[CLAUDE.md](./CLAUDE.md)** | 🤖 Claude Code 설정 & Agent Skills |
| **[docs/agents/](./docs/agents/)** | 🛠️ 에이전트 스킬 설정 (이슈 트래킹, 라벨링) |

---

## 🚀 빠른 시작

### 기술 스택
- **Frontend**: Next.js 14+ (App Router) + TypeScript + Tailwind CSS
- **Backend**: Supabase (PostgreSQL) + Supabase Auth
- **문서**: docx.js (DOCX 생성) + LibreOffice CLI (HWP 변환, MVP 2순위)
- **배포**: Vercel (Next.js 최적화)

### 개발 일정
```
Week 1 (7h)  → Supabase 스키마 + Next.js 기본 + 로그인
Week 2 (7h)  → 팀원 입력 폼 + CRUD 로직
Week 3 (7h)  → 팀장 선택 화면 + DOCX 생성
─────────────
총 21시간 (3주 × 1시간/day)
```

### MVP 성공 기준 (7/15까지)
1. ✅ 팀원이 입력 폼에 항목 작성 → 제출
2. ✅ 팀장이 팀원의 4개 항목 선택 → 확정
3. ✅ 팀장이 "보고서 다운로드" 클릭 → DOCX 파일 생성
4. ✅ 엑셀 없이도 조직도 데이터 기본 설정

---

## 📊 기능 로드맵

### 🔴 MVP 필수 (7/15까지)
- [x] 전체 스펙 정의
- [x] Next.js 프로젝트 초기화 (S0)
- [x] Supabase DB 스키마 설계 (S1: departments/profiles)
- [x] 로그인 화면 (사번/비밀번호) (S1)
- [x] 팀원 입력 폼 (최소 필드) + 금주/차주 자동분류 (S2)
- [x] 팀원 항목 수정/삭제/재편집 (S3)
- [x] 팀장 선택 화면 (4개 체크박스) + 롤업 (S4)
- [x] DOCX 보고서 생성 & 다운로드 (S5)
- [x] 기본 권한 관리 (RLS) (S1~S4)

### 🟡 MVP 2순위 (시간 남으면)
- [ ] 오탈자 검출 (hunspell)
- [ ] HWP 실시간 미리보기
- [ ] DOCX → HWP 자동 변환 (LibreOffice)

### 🟢 v2 (이후 개발)
- [ ] 부장/본부장/임원 다계층 확장
- [ ] 시스템 알림 (마감/대기/완료)
- [ ] 엑셀 조직도 자동 업로드
- [ ] 다음주 재활용 (지난주 미선택 복사)
- [ ] 고급 필터/검색/통계

---

## 🛠️ 로컬 개발 실행 (S0 이후)

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경변수 설정
```bash
cp .env.example .env.local
# .env.local에 Supabase 프로젝트 값 입력:
#   NEXT_PUBLIC_SUPABASE_URL
#   NEXT_PUBLIC_SUPABASE_ANON_KEY
#   SUPABASE_SERVICE_ROLE_KEY
```
> Supabase 값은 https://supabase.com 에서 프로젝트 생성 후
> Settings → API 에서 확인합니다.

### 3. DB 마이그레이션 적용
`supabase/migrations/` 의 SQL을 순서대로 Supabase SQL Editor에 실행합니다.
- `0000_health_check.sql` — S0 연결 확인용 헬스체크 테이블
- `0001_org_and_auth.sql` — departments/profiles + 가입 트리거 + RLS
- `0002_seed_departments.sql` — 조직도 시드 (카드본부 계층)

### 4. 데모 사용자 시드 (S1)
```bash
npm run seed:users
```
생성되는 데모 계정 (비밀번호 공통 `das1234!`):

| 사번 | 이름 | 역할 | 부서 |
|------|------|------|------|
| 1001 | 김팀원 | 팀원 | 카드개발1팀 |
| 1002 | 이팀원 | 팀원 | 카드개발1팀 |
| 2001 | 박팀장 | 팀장 | 카드개발1팀 |
| 3001 | 최부장 | 부장 | 카드개발부 |
| 4001 | 정본부장 | 본부장 | 카드본부 |

### 5. 개발 서버 실행
```bash
npm run dev
# http://localhost:3000       → Supabase 연결 상태(초록불) = S0
# http://localhost:3000/login → 사번/비번 로그인 → /dashboard = S1
```

### 검증 명령
```bash
npx tsc --noEmit   # 타입체크
npm run lint       # 린트
npm run build      # 프로덕션 빌드
```

### 3. GitHub Issues
```bash
# PRD를 개별 이슈로 분해
gh issue create --title "..." --body "..."

# 라벨 생성
gh label create "ready-for-agent"
gh label create "needs-triage"
```

---

## 📝 주요 결정사항

| 결정 | 선택 | 이유 |
|------|------|------|
| **DB** | PostgreSQL (Supabase) | Row Level Security로 권한 관리 |
| **인증** | Supabase Auth | JWT 기반, 통합 인증 |
| **문서** | docx.js + LibreOffice | 한글 지원, 오픈소스 |
| **배포** | Vercel | Next.js 최적화, 빠른 배포 |
| **선택 수** | 4개 (하드코딩) | 고정값, MVP는 간단하게 |
| **초기 데이터** | JSON/SQL 수동 입력 | 엑셀 자동 업로드는 v2 |

---

## ⚠️ 리스크 & 대응

| 리스크 | 대응 전략 |
|--------|---------|
| **시간 부족** | MVP 필수만 집중, 부가 기능은 v2로 |
| **기술 학습** | Week 1부터 튜토리얼 병행, 완벽보다 작동 우선 |
| **자동 롤업 복잡** | 팀원→팀장만 완벽히, 부장~임원은 UI 복사 |
| **HWP 변환 불확실** | DOCX만 먼저, HWP는 v2로 미룸 |

---

## 🤖 Claude Code 에이전트 스킬

이 프로젝트는 mattpocock의 engineering skills 를 사용합니다:

- **`/setup-matt-pocock-skills`** - 프로젝트 설정 (이슈 트래킹, 라벨링, 도메인 문서)
- **`/to-prd`** - 스펙 → PRD 변환
- **`/to-issues`** - PRD → GitHub Issues 자동 생성
- **`/triage`** - 이슈 자동 분류

---

## 📞 연락처

- **PM**: Tony Lee (dlxodud510@gmail.com)
- **저장소**: https://github.com/TONYLEE0510/das-weekly-reports
- **현황**: MVP 개발 중 (2026.06.24 ~ 7/15)

---

## 📄 라이선스

Internal Use Only - NH 정보시스템 전용
