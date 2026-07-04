# DAS MVP - 이슈 인덱스

**작성 일시**: 2026-06-24  
**총 이슈**: 64개 (개별 파일)  
**상태**: 모두 준비 완료

---

## 🔴 PHASE 1: MVP 필수 (21시간)

### Week 1: Foundation (7시간)

| # | 파일 | 제목 | 소요시간 | 차단자 |
|---|------|------|---------|--------|
| 1 | `01-supabase-schema.md` | Supabase DB 스키마 설계 및 초기화 | 2h | None |
| 2 | `02-nextjs-middleware.md` | Next.js 프로젝트 기본 구조 및 Supabase 미들웨어 | 2h | #1 |
| 3 | `03-login-auth.md` | 로그인 페이지 및 Supabase Auth 통합 | 2h | #2 |
| 4 | `04-org-data-load.md` | 조직도 데이터 로드 및 DB 초기화 | 1h | #1 |

**누적**: 7시간

---

### Week 2: Team Member Input (7시간)

| # | 파일 | 제목 | 소요시간 | 차단자 |
|---|------|------|---------|--------|
| 5 | `05-team-member-form.md` | 팀원 입력 폼 UI 구현 | 2h | #3 |
| 6 | `06-crud-api.md` | 팀원 항목 CRUD 및 DB 연동 | 2h | #5 |
| 7 | `07-submit-status.md` | 팀원 항목 제출 및 상태 관리 | 2h | #6 |

**누적**: 14시간

---

### Week 3: Manager Selection & Export (7시간)

| # | 파일 | 제목 | 소요시간 | 차단자 |
|---|------|------|---------|--------|
| 8 | `08-manager-selection-ui.md` | 팀장 선택 화면 UI 구현 | 2h | #7 |
| 9 | `09-rollup-logic.md` | 팀장 선택 항목 DB 저장 및 자동 롤업 | 2h | #8 |
| 10 | `10-docx-export.md` | DOCX 생성 및 다운로드 기능 | 1.5h | #9 |
| 11 | `11-e2e-testing.md` | E2E 통합 테스트 및 버그 수정 | 1.5h | #10 |

**누적**: **21시간 (MVP 완료)** ✅

---

## 🟡 PHASE 2: MVP 2순위 (5시간 - 시간 남으면)

| # | 파일 | 제목 | 소요시간 | 차단자 |
|---|------|------|---------|--------|
| 12 | `12-editor-mode.md` | 팀장 에디터 모드 - 선택 항목 수정 | 1h | #8 |
| 13 | `13-spell-check.md` | 오탈자 검출 및 하이라이트 (hunspell) | 1.5h | #5 |
| 14 | `14-hwp-preview.md` | 실시간 HWP 미리보기 | 1.5h | #8 |
| 15 | `15-docx-hwp-convert.md` | DOCX → HWP 자동 변환 (LibreOffice CLI) | 1h | #10 |

**누적**: 26시간

---

## 🟢 PHASE 3: 부장+ 다계층 (선택)

| # | 파일 | 제목 | 소요시간 | 차단자 |
|---|------|------|---------|--------|
| 16 | `16-multi-level-ui.md` | 부장/본부장/임원 선택 화면 (제네릭 UI) | 2h | #8 |
| 17 | `17-multi-level-rollup.md` | 다계층 자동 롤업 및 최종 보고서 생성 | 2h | #16 |

**누적**: 30시간

---

## 🎨 PHASE 4: 대시보드 & 관리자 (선택)

| # | 파일 | 제목 | 소요시간 | 차단자 |
|---|------|------|---------|--------|
| 18 | `18-main-dashboard.md` | 메인 대시보드 구현 (역할별 화면) | 2h | #3 |
| 19 | `19-admin-screen.md` | 시스템 관리자 화면 - 조직도 및 권한 설정 | 2h | #4 |
| 20 | `20-weekly-selection.md` | 주간 선택 화면 - 주차별 보고서 선택 | 1h | #18 |

**누적**: 35시간

---

## 🛡️ PHASE 5: 품질 & 보안 (선택)

| # | 파일 | 제목 | 소요시간 | 차단자 |
|---|------|------|---------|--------|
| 21 | `21-validation-error.md` | 데이터 검증 및 에러 처리 | 1.5h | #6 |
| 22 | `22-responsive-design.md` | 반응형 디자인 및 모바일 최적화 | 1.5h | 병렬 |
| 23 | `23-accessibility.md` | 접근성(Accessibility) 개선 | 1h | 병렬 |
| 24 | `24-security.md` | 인증 및 권한 보안 강화 | 1.5h | #3 |

**누적**: 40시간

---

## 📦 PHASE 6: v2 기능 (선택)

| # | 파일 | 제목 | 소요시간 | 차단자 |
|---|------|------|---------|--------|
| 25 | `25-reuse-items.md` | [v2] 다음주 재활용 - 미선택 항목 복사 | 1h | #7 |
| 26 | `26-unselected-items.md` | [v2] 선택되지 않은 항목 유지 | 1h | #9 |
| 27 | `27-notifications.md` | [v2] 시스템 알림 - 마감/대기/확정 알림 | 2h | #18 |
| 28 | `28-excel-import.md` | [v2] 엑셀 조직도 자동 업로드 | 2h | #19 |
| 29 | `29-search-filter.md` | [v2] 보고서 검색 및 필터링 | 1.5h | #18 |
| 30 | `30-statistics.md` | [v2] 보고서 통계 및 대시보드 | 2h | #18 |
| 31 | `31-audit-log.md` | [v2] 항목 역사/감사 로그 | 1.5h | #6 |

**누적**: 51시간

---

## 📚 PHASE 7: 문서화 & 최적화 (선택)

| # | 파일 | 제목 | 소요시간 | 차단자 |
|---|------|------|---------|--------|
| 32 | `32-api-docs.md` | [v2] API 문서화 및 개발자 가이드 | 1.5h | 모든 API |
| 33 | `33-performance.md` | [v2] 성능 최적화 | 2h | 모든 기능 |
| 34 | `34-testing.md` | [v2] 자동화된 테스트 | 2.5h | 모든 기능 |

**누적**: 57.5시간

---

## 📊 파일 위치

모든 이슈 파일은 `.scratch/issues/` 디렉토리에 저장되어 있습니다:

```bash
.scratch/
  ├── issues/
  │   ├── 01-supabase-schema.md
  │   ├── 02-nextjs-middleware.md
  │   ├── 03-login-auth.md
  │   ├── ... (총 34개)
  │   └── 34-testing.md
  ├── INDEX.md (이 파일)
  ├── ROADMAP.md (상세 구현 계획)
  ├── PRIORITIES.md (우선순위 요약)
  └── QUICK_REFERENCE.md (빠른 참조)
```

---

## 🎯 사용 방법

### 개별 이슈로 GitHub에 배포

```bash
# 1. 파일 읽기
cat .scratch/issues/01-supabase-schema.md

# 2. GitHub에 이슈 생성
gh issue create --title "Week 1-1: Supabase DB 스키마..." \
  --body "$(cat .scratch/issues/01-supabase-schema.md)"

# 3. 또는 수동으로 복사-붙여넣기
# GitHub Issues → New Issue → 본문에 마크다운 붙여넣기
```

### 진행 상황 추적

```bash
# 시작할 때
git checkout -b issue-1-supabase-schema

# 작업 완료 후
git commit -m "Implement Supabase schema (#1)"
git push origin issue-1-supabase-schema
gh pr create --title "Supabase schema (#1)" --body "Closes #1"
```

---

## 🚀 다음 단계

1. ✅ 모든 이슈 파일 생성 완료
2. ⏭️ 개별 이슈를 GitHub에 배포
3. ⏭️ Week 1 시작 (#1부터)

---

**작성자**: Claude Code  
**생성 일시**: 2026-06-24  
**목표**: 3주 × 1시간/day = 21시간으로 MVP 완성
