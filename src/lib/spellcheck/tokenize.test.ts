import { test } from "node:test";
import assert from "node:assert/strict";
import { tokenize } from "./tokenize.ts";

test("단일 단어: 한글 하나만 있으면 토큰 하나를 반환", () => {
  assert.deepEqual(tokenize("사과"), [{ word: "사과", start: 0, end: 2 }]);
});

test("공백으로 구분된 두 단어: 각각 별도 토큰으로 분리", () => {
  assert.deepEqual(tokenize("빨간 사과"), [
    { word: "빨간", start: 0, end: 2 },
    { word: "사과", start: 3, end: 5 },
  ]);
});

test("문장부호·숫자가 경계 역할을 하여 한글만 분리", () => {
  assert.deepEqual(tokenize("사과, 배3개"), [
    { word: "사과", start: 0, end: 2 },
    { word: "배", start: 4, end: 5 },
    { word: "개", start: 6, end: 7 },
  ]);
});

test("영문 혼합: 라틴 문자는 무시하고 한글만 추출", () => {
  assert.deepEqual(tokenize("hello 세계"), [
    { word: "세계", start: 6, end: 8 },
  ]);
});

test("빈 문자열/공백만 있는 문자열 → 빈 배열", () => {
  assert.deepEqual(tokenize(""), []);
  assert.deepEqual(tokenize("   "), []);
});

test("slice 불변식: 모든 토큰에 대해 text.slice(start,end)===word", () => {
  const text = "빨간 사과, 맛있는 배";
  const tokens = tokenize(text);
  assert.ok(tokens.length > 0);
  for (const t of tokens) {
    assert.equal(text.slice(t.start, t.end), t.word);
  }
});
