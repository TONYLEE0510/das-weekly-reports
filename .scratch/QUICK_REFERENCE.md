# DAS MVP - 빠른 참조 가이드

**마지막 갱신**: 2026-06-24  
**프로젝트**: Document Automatic System (주간업무 보고 자동화)  
**기간**: 3주 × 1시간/day = 21시간

---

## 🎯 핵심 목표

✅ **팀원** → 보고서 작성 & 제출  
✅ **팀장** → 4개 항목 선택 & DOCX 다운로드  
✅ **구조** → 부장/본부장/임원으로 확장 가능 (제네릭 설계)

---

## 📋 전체 이슈 목록 (64개)

### MVP 필수 (11개, 21시간)

```
Week 1 (7h):
  #31 Supabase 스키마
  #32 Next.js + Middleware
  #33 로그인 (Auth)
  #34 조직도 로드

Week 2 (7h):
  #35 팀원 폼 UI
  #36 CRUD API
  #37 제출 & 상태 관리

Week 3 (7h):
  #38 팀장 선택 UI
  #39 DB + 자동 롤업
  #40 DOCX 생성
  #41 E2E 테스트
```

### MVP 2순위 (4개, 5시간)
```
#42 에디터 모드 (1h)
#43 오탈자 검출 (1.5h)
#44 HWP 미리보기 (1.5h)
#45 DOCX → HWP 변환 (1h)
```

### 부장+ 다계층 (2개)
```
#46 부장+ 선택 UI (제네릭)
#47 다계층 롤업 & 최종 보고서
```

### 대시보드 & 관리자 (3개)
```
#48 메인 대시보드 (역할별)
#49 관리자 화면 (CRUD)
#50 주간 선택 화면
```

### 품질 & 보안 (4개)
```
#51 데이터 검증 & 에러
#52 반응형 디자인
#53 접근성 (WCAG)
#54 보안 강화
```

### v2 기능 (7개)
```
#55 다음주 재활용
#56 미선택 항목 유지
#57 시스템 알림
#58 엑셀 조직도 업로드
#59 보고서 검색/필터
#60 통계 & 대시보드
#61 감사 로그
```

### 문서화 & 최적화 (3개)
```
#62 API 문서화
#63 성능 최적화
#64 자동화 테스트
```

---

## 🔗 GitHub Issues

**저장소**: https://github.com/TONYLEE0510/das-weekly-reports

### 이슈별 링크

| # | 제목 | 상태 |
|---|------|------|
| 31 | [Supabase DB 스키마](https://github.com/TONYLEE0510/das-weekly-reports/issues/31) | ready-for-agent |
| 32 | [Next.js + Middleware](https://github.com/TONYLEE0510/das-weekly-reports/issues/32) | ready-for-agent |
| 33 | [로그인](https://github.com/TONYLEE0510/das-weekly-reports/issues/33) | ready-for-agent |
| 34 | [조직도 로드](https://github.com/TONYLEE0510/das-weekly-reports/issues/34) | ready-for-agent |
| 35 | [폼 UI](https://github.com/TONYLEE0510/das-weekly-reports/issues/35) | ready-for-agent |
| 36 | [CRUD API](https://github.com/TONYLEE0510/das-weekly-reports/issues/36) | ready-for-agent |
| 37 | [제출 & 상태](https://github.com/TONYLEE0510/das-weekly-reports/issues/37) | ready-for-agent |
| 38 | [팀장 선택 UI](https://github.com/TONYLEE0510/das-weekly-reports/issues/38) | ready-for-agent |
| 39 | [DB + 롤업](https://github.com/TONYLEE0510/das-weekly-reports/issues/39) | ready-for-agent |
| 40 | [DOCX 생성](https://github.com/TONYLEE0510/das-weekly-reports/issues/40) | ready-for-agent |
| 41 | [E2E 테스트](https://github.com/TONYLEE0510/das-weekly-reports/issues/41) | ready-for-agent |
| 42 | [에디터 모드](https://github.com/TONYLEE0510/das-weekly-reports/issues/42) | ready-for-agent |
| 43 | [오탈자 검출](https://github.com/TONYLEE0510/das-weekly-reports/issues/43) | ready-for-agent |
| 44 | [HWP 미리보기](https://github.com/TONYLEE0510/das-weekly-reports/issues/44) | ready-for-agent |
| 45 | [DOCX → HWP](https://github.com/TONYLEE0510/das-weekly-reports/issues/45) | ready-for-agent |
| 46 | [부장+ 선택 UI](https://github.com/TONYLEE0510/das-weekly-reports/issues/46) | ready-for-agent |
| 47 | [다계층 롤업](https://github.com/TONYLEE0510/das-weekly-reports/issues/47) | ready-for-agent |
| 48 | [메인 대시보드](https://github.com/TONYLEE0510/das-weekly-reports/issues/48) | ready-for-agent |
| 49 | [관리자 화면](https://github.com/TONYLEE0510/das-weekly-reports/issues/49) | ready-for-agent |
| 50 | [주간 선택](https://github.com/TONYLEE0510/das-weekly-reports/issues/50) | ready-for-agent |
| 51 | [데이터 검증](https://github.com/TONYLEE0510/das-weekly-reports/issues/51) | ready-for-agent |
| 52 | [반응형 디자인](https://github.com/TONYLEE0510/das-weekly-reports/issues/52) | ready-for-agent |
| 53 | [접근성](https://github.com/TONYLEE0510/das-weekly-reports/issues/53) | ready-for-agent |
| 54 | [보안 강화](https://github.com/TONYLEE0510/das-weekly-reports/issues/54) | ready-for-agent |
| 55 | [다음주 재활용](https://github.com/TONYLEE0510/das-weekly-reports/issues/55) | ready-for-agent |
| 56 | [미선택 항목](https://github.com/TONYLEE0510/das-weekly-reports/issues/56) | ready-for-agent |
| 57 | [시스템 알림](https://github.com/TONYLEE0510/das-weekly-reports/issues/57) | ready-for-agent |
| 58 | [엑셀 업로드](https://github.com/TONYLEE0510/das-weekly-reports/issues/58) | ready-for-agent |
| 59 | [검색/필터](https://github.com/TONYLEE0510/das-weekly-reports/issues/59) | ready-for-agent |
| 60 | [통계 대시보드](https://github.com/TONYLEE0510/das-weekly-reports/issues/60) | ready-for-agent |
| 61 | [감사 로그](https://github.com/TONYLEE0510/das-weekly-reports/issues/61) | ready-for-agent |
| 62 | [API 문서화](https://github.com/TONYLEE0510/das-weekly-reports/issues/62) | ready-for-agent |
| 63 | [성능 최적화](https://github.com/TONYLEE0510/das-weekly-reports/issues/63) | ready-for-agent |
| 64 | [자동화 테스트](https://github.com/TONYLEE0510/das-weekly-reports/issues/64) | ready-for-agent |

---

## 📊 차트: 이슈 의존성

```
#31 ─┬─ #32 ─┬─ #33 ─┬─ #35 ─ #36 ─ #37 ─ #38 ─ #39 ─ #40 ─ #41
     │       │      └─ #48 ─ #49
     │       └─ #34 ─ #49
     └─────────────────────────────────────────────────────────

#35 ─ #36 ─ #37 ─ #38 ─ #39 ─ #40 ─ #41
       │      │       │       │       │
       │      │       #42     #39     #40
       │      │       │       │       │
       #51    #37     #42     #39     #45
       │      │       │       │       │
       #61    #37     #44     #47     #45
```

---

## ⏱️ 예상 시간 분배

```
Week 1 (7h)
  - Supabase      [████░░░] 2h
  - Next.js       [████░░░] 2h
  - 로그인        [████░░░] 2h
  - 조직도        [██░░░░░] 1h

Week 2 (7h)
  - 폼 UI         [████░░░] 2h
  - CRUD          [████░░░] 2h
  - 제출/상태     [████░░░] 2h
  - 버퍼/테스트   [█░░░░░░] 1h

Week 3 (7h)
  - 팀장 UI       [████░░░] 2h
  - DB + 롤업     [████░░░] 2h
  - DOCX          [███░░░░] 1.5h
  - E2E 테스트    [███░░░░] 1.5h

= 21h MVP 완료 ✅

시간 남으면 (+5h)
  - 에디터        [██░░░░░] 1h
  - 오탈자        [███░░░░] 1.5h
  - 미리보기      [███░░░░] 1.5h
  - HWP 변환      [██░░░░░] 1h

= 26h 까지 가능
```

---

## 🛠️ 기술 스택

| 계층 | 기술 |
|------|------|
| **Frontend** | Next.js 14 (App Router) + TypeScript + Tailwind |
| **Backend** | Node.js (API Routes) |
| **Database** | Supabase (PostgreSQL) + RLS |
| **Auth** | Supabase Auth (JWT) |
| **Export** | docx.js (DOCX), LibreOffice CLI (HWP) |
| **Spell** | hunspell (한글 오탈자) |
| **Deployment** | Vercel |

---

## ✅ MVP 성공 기준

**다음 4단계가 완벽하게 작동하면 성공:**

1. ✅ 팀원이 로그인 → 보고서 작성 → 제출
2. ✅ 팀장이 로그인 → 팀원 항목 조회 → 4개 선택 → 확정
3. ✅ 팀장이 "보고서 다운로드" → DOCX 파일 받음
4. ✅ DOCX 열기 → 4개 항목 올바르게 표시

---

## 📝 매일 할 일 (1시간)

```
□ 5분: 오늘의 이슈 확인 (What)
□ 45분: 코딩 (How)
□ 5분: 테스트 & 버그 확인 (Works?)
□ 5분: 진행상황 기록 (Next?)

진행상황:
  □ 작업 내용 (1줄)
  □ 문제/해결 (있으면)
  □ 내일 계획 (1줄)
```

---

## 🎯 일주일 마일스톤

### Week 1 마일스톤
- [ ] Day 1: Supabase + 기본 구조 (Next.js)
- [ ] Day 2-3: 로그인 + 조직도
- [ ] Day 4-5: 기반 완료 (E2E 테스트)
- [ ] Day 6-7: 버퍼 / Week 2 준비

**Check**: 로그인 성공 → 대시보드 진입 가능?

### Week 2 마일스톤
- [ ] Day 1-2: 팀원 폼 + CRUD
- [ ] Day 3-4: 제출 & 상태 관리
- [ ] Day 5-7: 버퍼 / Week 3 준비

**Check**: 팀원 항목 작성 → 제출 → 팀장 화면에 표시?

### Week 3 마일스톤
- [ ] Day 1-2: 팀장 선택 UI + DB 저장
- [ ] Day 3: DOCX 생성 & 다운로드
- [ ] Day 4-5: E2E 테스트 & 버그 수정
- [ ] Day 6-7: MVP 완료 + 시간 남으면 2순위

**Check**: 팀장이 4개 선택 → DOCX 다운로드 → 파일 열기 가능?

---

## 🚀 Quick Start

```bash
# 1. 저장소 클론
git clone https://github.com/TONYLEE0510/das-weekly-reports
cd das-weekly-reports

# 2. 이슈 확인
gh issue list --state open

# 3. Week 1-1 시작
# Issue #31을 읽고 Supabase 스키마 설계 시작

# 4. PR 생성
git checkout -b issue-31-supabase-schema
# ... 작업 ...
git commit -m "Implement Supabase schema (#31)"
git push origin issue-31-supabase-schema
gh pr create --title "Supabase schema (#31)" --body "Closes #31"

# 5. PR 머지
# GitHub에서 수동으로 승인 후 머지
```

---

## 📚 참고 문서

| 문서 | 설명 |
|------|------|
| `ISSUES_SUMMARY.md` | 모든 이슈의 요약 (우선순위 포함) |
| `IMPLEMENTATION_ROADMAP.md` | 상세한 구현 계획 (day-by-day) |
| `ISSUES_BY_PRIORITY.md` | 우선순위별 이슈 정렬 |
| `QUICK_REFERENCE.md` | 이 문서 (빠른 참조) |

---

**최종 수정**: 2026-06-24  
**작성자**: Claude Code  
**대상**: TONYLEE0510
