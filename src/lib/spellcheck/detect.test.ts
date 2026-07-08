import { test } from "node:test";
import assert from "node:assert/strict";
import { detectTypos, type SpellChecker } from "./detect.ts";

const dict = new Set(["사과", "빨간", "배", "맛있는"]);
const checker: SpellChecker = { isCorrect: (w) => dict.has(w) };

test("모두 정확한 단어만 있으면 빈 배열을 반환", () => {
  assert.deepEqual(detectTypos("빨간 사과", checker), []);
});

test("오탈자 1개를 검출", () => {
  assert.deepEqual(detectTypos("빨간 사과아", checker), [
    { word: "사과아", start: 3, end: 6 },
  ]);
});

test("오프셋 정확성: slice(start,end)===word", () => {
  const text = "빨간 사과아";
  const [span] = detectTypos(text, checker);
  assert.equal(text.slice(span.start, span.end), "사과아");
});

test("여러 오탈자를 순서·오프셋 정확하게 검출", () => {
  assert.deepEqual(detectTypos("사과 배애 귤", checker), [
    { word: "배애", start: 3, end: 5 },
    { word: "귤", start: 6, end: 7 },
  ]);
});

test("무시 목록에 있는 단어는 오탈자여도 결과에서 제외", () => {
  assert.deepEqual(
    detectTypos("사과아 배", checker, { ignore: ["사과아"] }),
    [],
  );
});

test("무시 목록은 해당 단어만 제외하고 나머지 오탈자는 유지", () => {
  assert.deepEqual(
    detectTypos("사과아 귤", checker, { ignore: ["사과아"] }),
    [{ word: "귤", start: 4, end: 5 }],
  );
});

test("빈 텍스트는 빈 배열을 반환", () => {
  assert.deepEqual(detectTypos("", checker), []);
});
