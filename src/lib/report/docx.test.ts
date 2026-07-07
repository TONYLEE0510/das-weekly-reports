import { test } from "node:test";
import assert from "node:assert/strict";
import { buildReportDocx, type DocxItem } from "./docx.ts";

function item(over: Partial<DocxItem>): DocxItem {
  return {
    title: "샘플 업무",
    status_tag: "계속",
    assignee_name: "김팀원",
    description: "설명",
    edited_description: null,
    progress: "개발(50%)",
    date_start: "2026-07-06",
    date_end: "2026-07-09",
    report_section: "this_week",
    item_order: 1,
    ...over,
  };
}

test("buildReportDocx: 유효한 DOCX(zip) 버퍼를 생성", async () => {
  const buf = await buildReportDocx(
    [
      item({ item_order: 1, report_section: "this_week" }),
      item({ item_order: 2, report_section: "next_week", title: "차주 업무" }),
    ],
    { departmentName: "카드개발1팀", weekStart: "2026-07-06" },
  );

  // DOCX는 zip 컨테이너 → 'PK' 시그니처(0x50 0x4B)로 시작
  assert.equal(buf[0], 0x50);
  assert.equal(buf[1], 0x4b);
  // 최소한의 콘텐츠가 담겨 자명하지 않은 크기
  assert.ok(buf.length > 1000, `버퍼가 너무 작음: ${buf.length}`);
});

test("buildReportDocx: 항목이 없어도 문서를 생성", async () => {
  const buf = await buildReportDocx([], {
    departmentName: "카드개발1팀",
    weekStart: "2026-07-06",
  });
  assert.equal(buf[0], 0x50);
  assert.equal(buf[1], 0x4b);
});

test("buildReportDocx: edited_description가 있으면 우선 사용(오류 없이 생성)", async () => {
  const buf = await buildReportDocx(
    [item({ edited_description: "수정된 문구" })],
    { departmentName: "카드개발1팀", weekStart: "2026-07-06" },
  );
  assert.ok(buf.length > 1000);
});
