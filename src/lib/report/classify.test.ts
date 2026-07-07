import { test } from "node:test";
import assert from "node:assert/strict";
import { classifySection, thisWeekFriday } from "./classify.ts";

// 기준 주: 2026-07-06(월) ~ 2026-07-12(일), 금요일 = 2026-07-10
const REF = new Date(Date.UTC(2026, 6, 8)); // 2026-07-08 (수)

test("thisWeekFriday: 주중 어느 날이든 그 주 금요일을 반환", () => {
  const monday = new Date(Date.UTC(2026, 6, 6));
  const sunday = new Date(Date.UTC(2026, 6, 12));
  assert.equal(thisWeekFriday(monday).toISOString().slice(0, 10), "2026-07-10");
  assert.equal(thisWeekFriday(REF).toISOString().slice(0, 10), "2026-07-10");
  assert.equal(thisWeekFriday(sunday).toISOString().slice(0, 10), "2026-07-10");
});

test("완료일이 금요일 이전 → this_week", () => {
  assert.equal(classifySection("2026-07-06", "2026-07-09", REF), "this_week");
});

test("경계: 완료일이 금요일 당일 → this_week", () => {
  assert.equal(classifySection("2026-07-06", "2026-07-10", REF), "this_week");
});

test("진행 중: 시작 금요일 이내, 완료 금요일 이후 → this_week", () => {
  assert.equal(classifySection("2026-07-08", "2026-07-20", REF), "this_week");
});

test("경계: 시작일이 금요일 당일 → this_week", () => {
  assert.equal(classifySection("2026-07-10", "2026-07-24", REF), "this_week");
});

test("경계: 시작일이 금요일 다음날(토) → next_week", () => {
  assert.equal(classifySection("2026-07-11", "2026-07-24", REF), "next_week");
});

test("차주: 시작·완료 모두 다음주 → next_week", () => {
  assert.equal(classifySection("2026-07-13", "2026-07-17", REF), "next_week");
});

test("완료일만 있고 금요일 이내 → this_week", () => {
  assert.equal(classifySection(null, "2026-07-09", REF), "this_week");
});

test("날짜 정보 없음 → 기본 this_week", () => {
  assert.equal(classifySection(null, null, REF), "this_week");
});
