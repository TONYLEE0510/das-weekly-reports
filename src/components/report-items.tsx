"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ReportFields } from "./report-fields";
import { SECTION_LABEL, type ReportSection } from "@/lib/report/classify";

export interface ReportItem {
  id: string;
  title: string;
  status_tag: string;
  assignee_name: string | null;
  description: string | null;
  change_before: string | null;
  change_after: string | null;
  date_start: string | null;
  date_end: string | null;
  progress: string | null;
  report_section: ReportSection;
  created_at: string;
}

export function ReportItems({ items }: { items: ReportItem[] }) {
  if (items.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        아직 작성한 항목이 없습니다. 위에서 작성해 보세요.
      </p>
    );
  }
  return (
    <ul className="flex flex-col divide-y">
      {items.map((item) => (
        <Row key={item.id} item={item} />
      ))}
    </ul>
  );
}

function Row({ item }: { item: ReportItem }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const payload = Object.fromEntries(new FormData(e.currentTarget).entries());
    const res = await fetch(`/api/reports/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setBusy(false);
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? "수정에 실패했습니다.");
      return;
    }
    setEditing(false);
    router.refresh();
  }

  async function onDelete() {
    if (!confirm("이 항목을 삭제할까요?")) return;
    setBusy(true);
    const res = await fetch(`/api/reports/${item.id}`, { method: "DELETE" });
    setBusy(false);
    if (res.ok) router.refresh();
  }

  if (editing) {
    return (
      <li className="py-4">
        <form onSubmit={onSave} className="flex flex-col gap-3">
          <ReportFields values={item} />
          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={busy}
              className="rounded bg-black px-3 py-1.5 text-sm font-medium text-white disabled:opacity-50"
            >
              {busy ? "저장 중…" : "저장"}
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="rounded border px-3 py-1.5 text-sm"
            >
              취소
            </button>
          </div>
        </form>
      </li>
    );
  }

  return (
    <li className="flex items-start gap-3 py-3">
      <span
        className={`mt-0.5 shrink-0 rounded px-2 py-0.5 text-xs font-medium ${
          item.report_section === "this_week"
            ? "bg-blue-100 text-blue-700"
            : "bg-amber-100 text-amber-700"
        }`}
      >
        {SECTION_LABEL[item.report_section]}
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-medium">{item.title}</p>
        <p className="text-xs text-gray-500">
          {item.status_tag}
          {item.assignee_name && ` · ${item.assignee_name}`}
          {item.progress && ` · ${item.progress}`}
          {item.date_start && ` · ${item.date_start}`}
          {item.date_end && ` ~ ${item.date_end}`}
        </p>
      </div>
      <div className="flex shrink-0 gap-1">
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="rounded border px-2 py-1 text-xs hover:bg-gray-50"
        >
          수정
        </button>
        <button
          type="button"
          onClick={onDelete}
          disabled={busy}
          className="rounded border px-2 py-1 text-xs text-red-600 hover:bg-red-50 disabled:opacity-50"
        >
          삭제
        </button>
      </div>
    </li>
  );
}
