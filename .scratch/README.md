# DAS MVP - 개별 이슈 파일 가이드

**작성 일시**: 2026-06-24  
**파일 개수**: 34개 (모든 이슈가 개별 마크다운)  
**상태**: ✅ 모두 준비 완료

---

## 📂 디렉토리 구조

```
.scratch/
  ├── issues/                   # 개별 이슈 마크다운 파일 (34개)
  │   ├── 01-supabase-schema.md
  │   ├── 02-nextjs-middleware.md
  │   ├── ... (총 34개)
  │   └── 34-testing.md
  │
  ├── README.md                 # 이 문서
  ├── INDEX.md                  # 모든 이슈 인덱스 (링크)
  ├── ISSUES_SUMMARY.md         # 카테고리별 요약
  ├── IMPLEMENTATION_ROADMAP.md # 상세 구현 계획
  ├── ISSUES_BY_PRIORITY.md     # 우선순위 정렬
  └── QUICK_REFERENCE.md        # 빠른 참조
```

---

## 🚀 사용 방법

### 1️⃣ GitHub Issues로 배포하기

각 파일을 GitHub Issues로 등록합니다.

```bash
# 방법 1: GitHub CLI 사용
cd /Users/tonylee/Desktop/AI\ 2day/nh-day2/.scratch/issues

# 파일 내용으로 이슈 생성
gh issue create --title "Week 1-1: Supabase DB 스키마..." \
  --body "$(cat 01-supabase-schema.md)"

# 방법 2: 수동으로 복사-붙여넣기
# 1. GitHub Issues → "New issue" 클릭
# 2. Title 입력
# 3. Body 영역에 마크다운 파일 내용 복사-붙여넣기
```

### 2️⃣ 작업 진행하기

```bash
# 1. 이슈 파일 읽기
cat .scratch/issues/01-supabase-schema.md

# 2. 새 브랜치 생성
git checkout -b issue-1-supabase-schema

# 3. 코드 작성
# ... 작업 진행 ...

# 4. 커밋
git add .
git commit -m "Implement Supabase schema (#1)"

# 5. PR 생성
git push origin issue-1-supabase-schema
gh pr create --title "Supabase schema (#1)" --body "Closes #1"

# 6. GitHub에서 리뷰 후 머지
```

---

## 📋 파일 목록 (34개)

### 🔴 MVP 필수 (11개)

**Week 1: Foundation (4개)**
- `01-supabase-schema.md` - Supabase DB 스키마
- `02-nextjs-middleware.md` - Next.js 기본 구조
- `03-login-auth.md` - 로그인
- `04-org-data-load.md` - 조직도 데이터 로드

**Week 2: Team Member (3개)**
- `05-team-member-form.md` - 팀원 입력 폼
- `06-crud-api.md` - CRUD API
- `07-submit-status.md` - 제출 & 상태 관리

**Week 3: Manager (4개)**
- `08-manager-selection-ui.md` - 팀장 선택 UI
- `09-rollup-logic.md` - DB 저장 & 자동 롤업
- `10-docx-export.md` - DOCX 생성 & 다운로드
- `11-e2e-testing.md` - E2E 통합 테스트

**누적**: **21시간** ✅

---

### 🟡 MVP 2순위 (4개, 시간 남으면)

- `12-editor-mode.md` - 에디터 모드
- `13-spell-check.md` - 오탈자 검출
- `14-hwp-preview.md` - HWP 미리보기
- `15-docx-hwp-convert.md` - DOCX → HWP 변환

**누적**: 26시간

---

### 🟢 부장+ 다계층 (2개)

- `16-multi-level-ui.md` - 부장+ 선택 화면
- `17-multi-level-rollup.md` - 다계층 자동 롤업

**누적**: 30시간

---

### 🎨 대시보드 & 관리자 (3개)

- `18-main-dashboard.md` - 메인 대시보드
- `19-admin-screen.md` - 관리자 화면
- `20-weekly-selection.md` - 주간 선택 화면

**누적**: 35시간

---

### 🛡️ 품질 & 보안 (4개)

- `21-validation-error.md` - 데이터 검증 & 에러
- `22-responsive-design.md` - 반응형 디자인
- `23-accessibility.md` - 접근성
- `24-security.md` - 보안 강화

**누적**: 40시간

---

### 📦 v2 기능 (7개)

- `25-reuse-items.md` - 다음주 재활용
- `26-unselected-items.md` - 미선택 항목 유지
- `27-notifications.md` - 시스템 알림
- `28-excel-import.md` - 엑셀 조직도 업로드
- `29-search-filter.md` - 검색 & 필터링
- `30-statistics.md` - 통계 & 대시보드
- `31-audit-log.md` - 감사 로그

**누적**: 51시간

---

### 📚 문서화 & 최적화 (3개)

- `32-api-docs.md` - API 문서화
- `33-performance.md` - 성능 최적화
- `34-testing.md` - 자동화 테스트

**누적**: 57.5시간

---

## 📊 시간 요약

| Phase | 파일 수 | 소요시간 | 설명 |
|-------|--------|---------|------|
| MVP 필수 | 11 | **21h** | 반드시 완료 |
| MVP 2순위 | 4 | 5h | 시간 남으면 진행 |
| 부장+ | 2 | 4h | MVP 후 |
| 대시보드 | 3 | 5h | 필요할 때 |
| 품질/보안 | 4 | 5.5h | 병렬 진행 가능 |
| v2 기능 | 7 | 11.5h | 향후 개발 |
| 문서/최적화 | 3 | 6h | 마지막 |
| **합계** | **34** | **57.5h** | |

---

## ✅ 사용 체크리스트

### 준비 단계
- [ ] `.scratch/issues/` 디렉토리 확인 (34개 파일)
- [ ] `INDEX.md` 읽기 (전체 구조 파악)
- [ ] `QUICK_REFERENCE.md` 읽기 (빠른 참조)

### 배포 단계
- [ ] 각 이슈 파일을 GitHub Issues로 등록
- [ ] 또는 원래 만든 64개 이슈 그대로 사용

### 진행 단계
- [ ] Week 1부터 시작 (#1-4)
- [ ] 각 이슈별로 브랜치 생성 & 작업
- [ ] PR 생성 후 머지
- [ ] 매일 1시간씩 진행

---

## 🎯 다음 단계

### ✅ 완료됨
1. ✅ 모든 이슈 개별 마크다운 파일 생성 (34개)
2. ✅ 인덱스 생성 (INDEX.md)
3. ✅ 가이드 문서 생성 (이 문서)

### ⏭️ 해야 할 일
1. GitHub Issues로 배포 (선택사항 - 이미 생성됨)
2. Week 1부터 시작 (#1: Supabase 스키마)
3. 매일 1시간씩 진행

---

## 📖 문서 가이드

| 문서 | 용도 |
|------|------|
| `README.md` | 이 파일 - 빠른 가이드 |
| `INDEX.md` | 모든 이슈 인덱스 (링크) |
| `QUICK_REFERENCE.md` | 빠른 참조 (체크리스트) |
| `ISSUES_SUMMARY.md` | 카테고리별 요약 |
| `IMPLEMENTATION_ROADMAP.md` | 상세 week-by-week 계획 |
| `ISSUES_BY_PRIORITY.md` | 우선순위별 정렬 |

---

## 🔗 링크

**저장소**: https://github.com/TONYLEE0510/das-weekly-reports  
**Issues**: https://github.com/TONYLEE0510/das-weekly-reports/issues

---

## 💡 팁

### 파일 내용 빠르게 확인
```bash
# 모든 이슈 파일 제목 보기
head -1 .scratch/issues/*.md

# 특정 이슈 내용 보기
cat .scratch/issues/01-supabase-schema.md

# grep으로 검색
grep -r "Timeline" .scratch/issues/
```

### GitHub CLI로 배포
```bash
# 모든 이슈를 한번에 배포 (주의: 실행하기 전 확인!)
# for file in .scratch/issues/*.md; do
#   gh issue create --title "$(head -1 $file | sed 's/^# //')" \
#     --body "$(cat $file)"
# done
```

---

**작성자**: Claude Code  
**생성 일시**: 2026-06-24  
**상태**: ✅ 모든 파일 준비 완료
