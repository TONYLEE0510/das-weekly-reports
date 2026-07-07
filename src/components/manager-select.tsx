"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { SECTION_LABEL, type ReportSection } from "@/lib/report/classify";
import { SELECTION_COUNT } from "@/lib/report/constants";

export interface ManagerItem {
  id: string;
  title: string;
  status_tag: string;
  author_name: string | null;
  progress: string | null;
  report_section: ReportSection;
  selected: boolean;
}

export function ManagerSelect({ items }: { items: ManagerItem[] }) {
  const router = useRouter();
  const [checked, setChecked] = useState<Set<string>>(
    () => new Set(items.filter((i) => i.selected).map((i) => i.id)),
  );
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const count = checked.size;
  const canConfirm = count === SELECTION_COUNT;

  const hasConfirmed = useMemo(() => items.some((i) => i.selected), [items]);

  function toggle(id: string) {
    setDone(false);
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function onConfirm() {
    setBusy(true);
    setError(null);
    const res = await fetch("/api/reports/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemIds: [...checked] }),
    });
    setBusy(false);
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? "확정에 실패했습니다.");
      return;
    }
    setDone(true);
    router.refresh();
  }

  if (items.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        이번 주 팀원이 제출한 항목이 없습니다.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <ul className="flex flex-col divide-y">
        {items.map((item) => {
          const isChecked = checked.has(item.id);
          return (
            <li key={item.id} className="flex items-start gap-3 py-3">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => toggle(item.id)}
                className="mt-1 h-4 w-4"
                aria-label={`${item.title} 선택`}
              />
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
                  {item.author_name ?? "?"} · {item.status_tag}
                  {item.progress && ` · ${item.progress}`}
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="flex items-center gap-3">
        <span
          className={`text-sm font-medium ${
            canConfirm ? "text-green-700" : "text-gray-500"
          }`}
        >
          {count} / {SELECTION_COUNT} 선택
        </span>
        <button
          type="button"
          onClick={onConfirm}
          disabled={!canConfirm || busy}
          className="rounded bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
        >
          {busy ? "확정 중…" : hasConfirmed ? "재확정" : "확정 제출"}
        </button>
        {done && <span className="text-sm text-green-700">확정되었습니다 ✓</span>}
        {error && (
          <span className="text-sm text-red-600" role="alert">
            {error}
          </span>
        )}
      </div>

      {hasConfirmed && (
        <a
          href="/api/export/docx"
          className="self-start rounded border border-black px-4 py-2 text-sm font-medium hover:bg-gray-50"
        >
          보고서 다운로드 (DOCX)
        </a>
      )}
      <p className="text-xs text-gray-400">
        정확히 {SELECTION_COUNT}개를 선택해야 확정할 수 있습니다.
      </p>
    </div>
  );
}
