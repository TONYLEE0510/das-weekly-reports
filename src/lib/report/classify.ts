// S2 핵심: 금주/차주 자동분류 (카드본부 규정 기준)
//
// 규칙:
//   IF   작업완료일 <= 이번주 금요일                 → this_week
//   ELIF 작업시작일 <= 이번주 금요일 < 작업완료일     → this_week (진행 중)
//   ELSE (작업시작일 > 이번주 금요일)                → next_week
//
// 날짜는 시간대 영향을 받지 않도록 '일(day) 단위'로만 비교한다.

export type ReportSection = "this_week" | "next_week";

/** Date를 자정 기준 '일 번호'(epoch day)로 환산 */
function toEpochDay(d: Date): number {
  return Math.floor(
    Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) /
      86_400_000,
  );
}

/** "YYYY-MM-DD" 또는 Date를 UTC 자정 Date로 파싱 (null 허용) */
function parseDate(value: string | Date | null | undefined): Date | null {
  if (!value) return null;
  if (value instanceof Date) {
    return new Date(
      Date.UTC(value.getFullYear(), value.getMonth(), value.getDate()),
    );
  }
  const m = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return null;
  return new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])));
}

/**
 * 기준일이 속한 주(월~일)의 금요일을 반환한다.
 * 월요일=0 ... 금요일=4 ... 일요일=6 기준으로 계산.
 */
export function thisWeekFriday(reference: Date = new Date()): Date {
  const ref = new Date(
    Date.UTC(
      reference.getFullYear(),
      reference.getMonth(),
      reference.getDate(),
    ),
  );
  // getUTCDay(): 일=0, 월=1 ... 토=6  →  월=0 기준으로 변환
  const mondayIndex = (ref.getUTCDay() + 6) % 7;
  const diffToFriday = 4 - mondayIndex; // 금요일까지의 오프셋
  ref.setUTCDate(ref.getUTCDate() + diffToFriday);
  return ref;
}

/** 기준일이 속한 주(월~일)의 월요일을 "YYYY-MM-DD"로 반환 */
export function thisWeekMonday(reference: Date = new Date()): string {
  const friday = thisWeekFriday(reference);
  friday.setUTCDate(friday.getUTCDate() - 4); // 금요일 - 4 = 월요일
  return friday.toISOString().slice(0, 10);
}

/**
 * 작업 시작/완료일을 기준으로 금주/차주를 판정한다.
 * @param dateStart 작업시작일 ("YYYY-MM-DD" | Date | null)
 * @param dateEnd   작업완료일 ("YYYY-MM-DD" | Date | null)
 * @param reference 기준일 (기본: 오늘)
 */
export function classifySection(
  dateStart: string | Date | null | undefined,
  dateEnd: string | Date | null | undefined,
  reference: Date = new Date(),
): ReportSection {
  const friday = toEpochDay(thisWeekFriday(reference));
  const start = parseDate(dateStart);
  const end = parseDate(dateEnd);

  // 완료일이 이번주 금요일 이내 → 금주
  if (end !== null && toEpochDay(end) <= friday) {
    return "this_week";
  }

  // 시작일이 금요일 이내이고 (완료일이 없거나 금요일 이후) → 진행 중, 금주
  if (start !== null && toEpochDay(start) <= friday) {
    return "this_week";
  }

  // 시작일이 다음주 이후 → 차주. (날짜 정보가 없으면 기본 금주로 처리)
  if (start !== null && toEpochDay(start) > friday) {
    return "next_week";
  }

  return "this_week";
}

export const SECTION_LABEL: Record<ReportSection, string> = {
  this_week: "금주 실행사항",
  next_week: "차주 예정사항",
};
