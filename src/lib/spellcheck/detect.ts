// S8 핵심: 오탈자 검출 + 무시 처리
//
// Task 1의 tokenize로 얻은 각 토큰을 주입된 SpellChecker로 검사한다.
// 사전에 없는 단어는 오탈자로 간주하되, 무시 목록에 포함된 단어는 제외한다.

import { tokenize } from "./tokenize.ts";

/** 사전/맞춤법 검사기. hunspell 등은 이후 이 인터페이스를 구현한다. */
export interface SpellChecker {
  isCorrect(word: string): boolean;
}

export interface TypoSpan {
  word: string;
  start: number;
  end: number;
}

export interface DetectOptions {
  ignore?: Iterable<string>; // 이 단어들은 오탈자여도 결과에서 제외
}

export function detectTypos(
  text: string,
  checker: SpellChecker,
  options?: DetectOptions,
): TypoSpan[] {
  const ignore = new Set(options?.ignore ?? []);
  const spans: TypoSpan[] = [];
  for (const token of tokenize(text)) {
    if (ignore.has(token.word)) continue;
    if (!checker.isCorrect(token.word)) {
      spans.push({ word: token.word, start: token.start, end: token.end });
    }
  }
  return spans;
}
