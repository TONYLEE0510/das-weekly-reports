# DAS MVP - 이슈 분해 요약

**생성 일시**: 2026-06-24  
**총 이슈 수**: 64개  
**우선순위**: MVP 필수 → MVP 2순위 → 부장+ → v2

---

## 📅 Week 1: 기반 & 학습 (약 7시간)

### 필수 이슈

| # | 제목 | 설명 | 차단자 |
|---|------|------|--------|
| **31** | [Supabase DB 스키마 설계 및 초기화](https://github.com/TONYLEE0510/das-weekly-reports/issues/31) | users, departments, weekly_reports, report_items 테이블 생성 + RLS 설정 | None |
| **32** | [Next.js 프로젝트 기본 구조 및 Supabase 미들웨어](https://github.com/TONYLEE0510/das-weekly-reports/issues/32) | App Router 구조, auth middleware, Supabase 클라이언트 설정 | #31 |
| **33** | [로그인 페이지 및 Supabase Auth 통합](https://github.com/TONYLEE0510/das-weekly-reports/issues/33) | 사번/비밀번호 로그인, JWT 쿠키, 리다이렉트 | #32 |
| **34** | [조직도 데이터 로드 및 DB 초기화](https://github.com/TONYLEE0510/das-weekly-reports/issues/34) | JSON/SQL 조직도 데이터 준비, Supabase 로드 | #31 |

**누적 시간**: ~7시간

---

## 📝 Week 2: 팀원 입력 (약 7시간)

### 필수 이슈

| # | 제목 | 설명 | 차단자 |
|---|------|------|--------|
| **35** | [팀원 입력 폼 UI 구현](https://github.com/TONYLEE0510/das-weekly-reports/issues/35) | 제목, 상태, 담당자, 설명, 날짜, 진행율 필드 | #33 |
| **36** | [팀원 항목 CRUD 및 DB 연동](https://github.com/TONYLEE0510/das-weekly-reports/issues/36) | POST/GET/PATCH/DELETE API, RLS 권한 | #35 |
| **37** | [팀원 항목 제출 및 상태 관리](https://github.com/TONYLEE0510/das-weekly-reports/issues/37) | draft → submitted → draft 상태 전환, 항목 목록 조회 | #36 |

**누적 시간**: 7 + 7 = ~14시간

---

## 📊 Week 3: 팀장 선택 & 완성 (약 7시간)

### 필수 이슈

| # | 제목 | 설명 | 차단자 |
|---|------|------|--------|
| **38** | [팀장 선택 화면 UI 구현](https://github.com/TONYLEE0510/das-weekly-reports/issues/38) | 체크박스 4개 선택, 카운터, "확정 제출" 버튼 활성화 | #37 |
| **39** | [팀장 선택 항목 DB 저장 및 자동 롤업](https://github.com/TONYLEE0510/das-weekly-reports/issues/39) | weekly_reports(level=manager), selected=true 마킹, 제네릭 설계 | #38 |
| **40** | [DOCX 생성 및 다운로드 기능](https://github.com/TONYLEE0510/das-weekly-reports/issues/40) | docx.js로 4개 항목 → DOCX 생성, 다운로드 엔드포인트 | #39 |
| **41** | [E2E 통합 테스트 및 버그 수정](https://github.com/TONYLEE0510/das-weekly-reports/issues/41) | MVP 5단계 플로우 검증: 로그인 → 입력 → 제출 → 선택 → 다운로드 | #40 |

**누적 시간**: 14 + 7 = **21시간 (MVP 완료)**

---

## 🔄 MVP 2순위 (시간 남으면)

| # | 제목 | 설명 | 차단자 | 예상 시간 |
|---|------|------|--------|---------|
| **42** | [팀장 에디터 모드 - 선택 항목 수정](https://github.com/TONYLEE0510/das-weekly-reports/issues/42) | 선택된 항목 텍스트 수정, edited_description 저장 | #38 | ~1h |
| **43** | [오탈자 검출 및 하이라이트 (hunspell)](https://github.com/TONYLEE0510/das-weekly-reports/issues/43) | 입력폼에서 실시간 한글 오탈자 검출 + 빨간 밑줄 | #35 | ~1.5h |
| **44** | [실시간 HWP 미리보기](https://github.com/TONYLEE0510/das-weekly-reports/issues/44) | 좌측: 입력/선택, 우측: HWP 스타일 미리보기 | #38 | ~1.5h |
| **45** | [DOCX → HWP 자동 변환 (LibreOffice CLI)](https://github.com/TONYLEE0510/das-weekly-reports/issues/45) | LibreOffice CLI로 DOCX → HWP 변환 | #40 | ~1h |

**누적 시간**: 21 + 5 = **26시간**

---

## 🏛️ 부장+ 다계층 (week 3 이후)

| # | 제목 | 설명 | 차단자 |
|---|------|------|--------|
| **46** | [부장/본부장/임원 선택 화면 (제네릭 UI)](https://github.com/TONYLEE0510/das-weekly-reports/issues/46) | SelectionScreen 컴포넌트 리팩토링, level prop으로 동작 변경 | #38 |
| **47** | [다계층 자동 롤업 및 최종 보고서 생성](https://github.com/TONYLEE0510/das-weekly-reports/issues/47) | 팀원 → 팀장 → 부장 → 본부장 → 임원, 최종 executive 보고서 | #46 |

---

## 🎨 대시보드 & 관리자

| # | 제목 | 설명 | 차단자 |
|---|------|------|--------|
| **48** | [메인 대시보드 구현 (역할별 화면)](https://github.com/TONYLEE0510/das-weekly-reports/issues/48) | 팀원: 항목 목록, 팀장+: 선택 화면 | #33 |
| **49** | [[관리자] 시스템 관리자 화면 - 조직도 및 권한 설정](https://github.com/TONYLEE0510/das-weekly-reports/issues/49) | 부서/사용자 CRUD, 선택 항목 수 설정 | #34 |
| **50** | [주간 선택 화면 - 주차별 보고서 선택](https://github.com/TONYLEE0510/das-weekly-reports/issues/50) | 현재 주차 자동 선택, 이전/다음주 네비게이션 | #48 |

---

## 🛡️ 품질 & 보안

| # | 제목 | 설명 | 차단자 |
|---|------|------|--------|
| **51** | [데이터 검증 및 에러 처리](https://github.com/TONYLEE0510/das-weekly-reports/issues/51) | 클라이언트/서버 검증, 에러 메시지, 토스트 알림 | #36 |
| **52** | [반응형 디자인 및 모바일 최적화](https://github.com/TONYLEE0510/das-weekly-reports/issues/52) | 모바일/태블릿/데스크톱 레이아웃, 터치 친화적 | 병렬 |
| **53** | [접근성(Accessibility) 개선](https://github.com/TONYLEE0510/das-weekly-reports/issues/53) | WCAG 2.1 AA, 시맨틱 HTML, ARIA, 키보드 네비게이션 | 병렬 |
| **54** | [인증 및 권한 보안 강화](https://github.com/TONYLEE0510/das-weekly-reports/issues/54) | CSRF, Rate limiting, 비밀번호 정책, 세션 타임아웃 | #33 |

---

## 📦 v2 기능

| # | 제목 | 설명 | 차단자 |
|---|------|------|--------|
| **55** | [[v2] 다음주 재활용 - 미선택 항목 복사](https://github.com/TONYLEE0510/das-weekly-reports/issues/55) | 지난주 미선택 항목 → 이번주 draft로 복사 | #37 |
| **56** | [[v2] 선택되지 않은 항목 유지](https://github.com/TONYLEE0510/das-weekly-reports/issues/56) | 미선택 항목 아카이빙, 조회 화면 | #39 |
| **57** | [[v2] 시스템 알림 - 마감/대기/확정 알림](https://github.com/TONYLEE0510/das-weekly-reports/issues/57) | 이메일/인앱 알림, Supabase Edge Functions | #48 |
| **58** | [[v2] 엑셀 조직도 자동 업로드](https://github.com/TONYLEE0510/das-weekly-reports/issues/58) | 엑셀 파일 파싱 & 로드, 미리보기, 검증 | #49 |
| **59** | [[v2] 보고서 검색 및 필터링](https://github.com/TONYLEE0510/das-weekly-reports/issues/59) | 키워드 검색, 다중 필터, 정렬, 페이지네이션 | #48 |
| **60** | [[v2] 보고서 통계 및 대시보드](https://github.com/TONYLEE0510/das-weekly-reports/issues/60) | 제출률, 확정 현황, 차트 (Chart.js/Recharts) | #48 |
| **61** | [[v2] 항목 역사/감사 로그](https://github.com/TONYLEE0510/das-weekly-reports/issues/61) | 변경 이력 추적, 타임라인, 버전 복원 | #36 |
| **62** | [[v2] API 문서화 및 개발자 가이드](https://github.com/TONYLEE0510/das-weekly-reports/issues/62) | Swagger/OpenAPI, 개발 가이드, README | 모든 API 후 |
| **63** | [[v2] 성능 최적화](https://github.com/TONYLEE0510/das-weekly-reports/issues/63) | 번들 최소화, 이미지 최적화, 캐싱, Lighthouse > 80 | 모든 기능 후 |
| **64** | [[v2] 자동화된 테스트](https://github.com/TONYLEE0510/das-weekly-reports/issues/64) | Jest, Vitest, Playwright, GitHub Actions, 커버리지 > 80% | 모든 기능 후 |

---

## 🎯 우선순위 요약

### 🔴 MVP 필수 (Week 1-3, 21시간)
1. #31 Supabase 스키마
2. #32 Next.js 기본 구조
3. #33 로그인
4. #34 조직도 로드
5. #35-37 팀원 입력 (CRUD + 제출)
6. #38-41 팀장 선택 (UI + DB + DOCX + E2E)

### 🟡 MVP 2순위 (시간 남으면, ~5시간)
- #42 에디터 모드
- #43 오탈자 검출
- #44 HWP 미리보기
- #45 DOCX → HWP 변환

### 🟢 부장+ & v2 (Week 3 이후)
- #46-47 다계층 롤업
- #48-54 대시보드/관리자/품질
- #55-64 v2 기능

---

## 📊 예상 시간 분배

```
Week 1: #31-34 (7h)
  └─ Supabase, Next.js, Auth, 조직도

Week 2: #35-37 (7h)
  └─ 팀원 폼, CRUD, 제출

Week 3: #38-41 (7h)
  └─ 팀장 선택, 자동 롤업, DOCX, E2E

총 21시간 → MVP 완료

시간 남으면: #42-45 (5h)
  └─ 에디터, 오탈자, 미리보기, HWP 변환

남은 시간: #46-54 (10h+)
  └─ 부장+, 대시보드, 관리자, 품질
```

---

## 🚀 다음 단계

1. **Week 1 시작**: #31 (Supabase)부터 진행
2. **병렬 가능 이슈**: 
   - #32-34는 #31 완료 후
   - #52-53은 UI 구현 시 병렬
3. **시간 관리**: 매일 1시간 × 3주 = 정확히 21시간
4. **피드백 루프**: 매일 진행상황 체크

---

**작성자**: Claude Code  
**생성 일시**: 2026-06-24
