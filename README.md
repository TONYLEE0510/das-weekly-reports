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
- [ ] Supabase DB 스키마 설계
- [ ] Next.js 프로젝트 초기화
- [ ] 로그인 화면 (사번/비밀번호)
- [ ] 팀원 입력 폼 (최소 필드)
- [ ] 팀장 선택 화면 (4개 체크박스)
- [ ] DOCX 보고서 생성 & 다운로드
- [ ] 기본 권한 관리 (RLS)

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

## 🛠️ 개발 시작

### 1. 환경 설정
```bash
# Node.js 18+ 필요
node --version

# Supabase CLI 설치
npm install -g @supabase/cli

# Next.js 프로젝트 생성 (나중에)
npx create-next-app@latest --typescript
```

### 2. Supabase 프로젝트
```bash
# Supabase 계정 생성 & 프로젝트 초기화
supabase start

# DB 스키마 import (final_spec.md 참고)
# users, departments, weekly_reports, report_items 테이블 생성
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
