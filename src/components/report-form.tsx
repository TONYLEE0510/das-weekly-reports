"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const FIELD =
  "rounded border px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-black/20";

export function ReportForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());

    const res = await fetch("/api/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setPending(false);

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? "저장에 실패했습니다.");
      return;
    }

    form.reset();
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="text-sm font-medium">
          업무제목 <span className="text-red-500">*</span>
        </label>
        <input id="title" name="title" required className={FIELD} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="status_tag" className="text-sm font-medium">
            상태 <span className="text-red-500">*</span>
          </label>
          <select id="status_tag" name="status_tag" required className={FIELD} defaultValue="신규">
            <option value="신규">신규</option>
            <option value="계속">계속</option>
            <option value="완료">완료</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="assignee_name" className="text-sm font-medium">
            담당자
          </label>
          <input id="assignee_name" name="assignee_name" className={FIELD} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="date_start" className="text-sm font-medium">
            작업시작일
          </label>
          <input id="date_start" name="date_start" type="date" className={FIELD} />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="date_end" className="text-sm font-medium">
            작업완료일
          </label>
          <input id="date_end" name="date_end" type="date" className={FIELD} />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="progress" className="text-sm font-medium">
            진행도
          </label>
          <input id="progress" name="progress" placeholder="예: 개발(10%)" className={FIELD} />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="text-sm font-medium">
          업무설명
        </label>
        <textarea id="description" name="description" rows={2} className={FIELD} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="change_before" className="text-sm font-medium">
            변경 전 수행사항
          </label>
          <textarea id="change_before" name="change_before" rows={2} className={FIELD} />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="change_after" className="text-sm font-medium">
            변경 후 수행사항
          </label>
          <textarea id="change_after" name="change_after" rows={2} className={FIELD} />
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-1 self-start rounded bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        {pending ? "저장 중…" : "제출"}
      </button>
      <p className="text-xs text-gray-400">
        작업시작일/완료일을 기준으로 금주·차주가 자동 분류됩니다.
      </p>
    </form>
  );
}
