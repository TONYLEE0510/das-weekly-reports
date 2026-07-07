const FIELD =
  "rounded border px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-black/20";

export interface ReportFieldValues {
  title?: string | null;
  status_tag?: string | null;
  assignee_name?: string | null;
  date_start?: string | null;
  date_end?: string | null;
  progress?: string | null;
  description?: string | null;
  change_before?: string | null;
  change_after?: string | null;
}

/**
 * 보고 항목 입력 필드 (생성/수정 폼 공용). 순수 마크업 — 제출은 상위 <form>이 담당.
 */
export function ReportFields({ values }: { values?: ReportFieldValues }) {
  const v = values ?? {};
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">
          업무제목 <span className="text-red-500">*</span>
        </label>
        <input name="title" required defaultValue={v.title ?? ""} className={FIELD} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">
            상태 <span className="text-red-500">*</span>
          </label>
          <select
            name="status_tag"
            required
            defaultValue={v.status_tag ?? "신규"}
            className={FIELD}
          >
            <option value="신규">신규</option>
            <option value="계속">계속</option>
            <option value="완료">완료</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">담당자</label>
          <input name="assignee_name" defaultValue={v.assignee_name ?? ""} className={FIELD} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">작업시작일</label>
          <input name="date_start" type="date" defaultValue={v.date_start ?? ""} className={FIELD} />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">작업완료일</label>
          <input name="date_end" type="date" defaultValue={v.date_end ?? ""} className={FIELD} />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">진행도</label>
          <input
            name="progress"
            placeholder="예: 개발(10%)"
            defaultValue={v.progress ?? ""}
            className={FIELD}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">업무설명</label>
        <textarea name="description" rows={2} defaultValue={v.description ?? ""} className={FIELD} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">변경 전 수행사항</label>
          <textarea
            name="change_before"
            rows={2}
            defaultValue={v.change_before ?? ""}
            className={FIELD}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">변경 후 수행사항</label>
          <textarea
            name="change_after"
            rows={2}
            defaultValue={v.change_after ?? ""}
            className={FIELD}
          />
        </div>
      </div>
    </div>
  );
}
