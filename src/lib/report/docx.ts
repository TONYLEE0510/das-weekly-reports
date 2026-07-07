import {
  Document,
  Packer,
  Paragraph,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  TextRun,
  WidthType,
} from "docx";
import type { ReportSection } from "./classify";

// classify를 런타임 import하지 않도록 라벨을 인라인 (node --test 호환)
const SECTION_LABEL: Record<ReportSection, string> = {
  this_week: "금주 실행사항",
  next_week: "차주 예정사항",
};

export interface DocxItem {
  title: string;
  status_tag: string;
  assignee_name: string | null;
  description: string | null;
  edited_description: string | null;
  progress: string | null;
  date_start: string | null;
  date_end: string | null;
  report_section: ReportSection;
  item_order: number | null;
}

export interface DocxMeta {
  departmentName: string;
  weekStart: string;
}

function cell(text: string, opts?: { bold?: boolean; width?: number }) {
  return new TableCell({
    width: opts?.width
      ? { size: opts.width, type: WidthType.PERCENTAGE }
      : undefined,
    children: [
      new Paragraph({
        children: [new TextRun({ text, bold: opts?.bold })],
      }),
    ],
  });
}

function sectionTable(items: DocxItem[]): Table {
  const header = new TableRow({
    tableHeader: true,
    children: [
      cell("제목", { bold: true, width: 34 }),
      cell("상태", { bold: true, width: 12 }),
      cell("담당자", { bold: true, width: 14 }),
      cell("진행도", { bold: true, width: 14 }),
      cell("내용", { bold: true, width: 26 }),
    ],
  });

  const rows = items.map(
    (it) =>
      new TableRow({
        children: [
          cell(it.title),
          cell(it.status_tag),
          cell(it.assignee_name ?? ""),
          cell(it.progress ?? ""),
          cell(it.edited_description ?? it.description ?? ""),
        ],
      }),
  );

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [header, ...rows],
  });
}

/**
 * 확정된 보고 항목들을 금주/차주 섹션으로 나눠 주간보고 DOCX 버퍼를 생성한다.
 */
export async function buildReportDocx(
  items: DocxItem[],
  meta: DocxMeta,
): Promise<Buffer> {
  const ordered = [...items].sort(
    (a, b) => (a.item_order ?? 0) - (b.item_order ?? 0),
  );
  const sections: ReportSection[] = ["this_week", "next_week"];

  const children: (Paragraph | Table)[] = [
    new Paragraph({
      text: `${meta.departmentName} 주간업무보고`,
      heading: HeadingLevel.HEADING_1,
    }),
    new Paragraph({
      children: [
        new TextRun({ text: `주차 시작: ${meta.weekStart}`, italics: true }),
      ],
    }),
  ];

  for (const section of sections) {
    const sectionItems = ordered.filter((i) => i.report_section === section);
    if (sectionItems.length === 0) continue;
    children.push(
      new Paragraph({
        text: SECTION_LABEL[section],
        heading: HeadingLevel.HEADING_2,
      }),
    );
    children.push(sectionTable(sectionItems));
  }

  const doc = new Document({ sections: [{ children }] });
  return Packer.toBuffer(doc);
}
