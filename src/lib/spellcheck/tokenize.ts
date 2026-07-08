// S8 핵심: 한국어 토크나이저
//
// 원문에서 한글(Hangul) 문자의 최대 연속 구간을 토큰으로 추출한다.
// 공백·문장부호·숫자·라틴 문자는 토큰에 포함하지 않으며 경계 역할만 한다.

export interface Token {
  word: string; // 한글 단어
  start: number; // 원문에서 첫 글자 인덱스
  end: number; // 마지막 글자 다음 인덱스(exclusive) — text.slice(start,end)===word
}

const HANGUL_RUN = /\p{Script=Hangul}+/gu;

export function tokenize(text: string): Token[] {
  const tokens: Token[] = [];
  for (const match of text.matchAll(HANGUL_RUN)) {
    const word = match[0];
    const start = match.index;
    tokens.push({ word, start, end: start + word.length });
  }
  return tokens;
}
