"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ReportFields } from "./report-fields";

export function ReportForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);

    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

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
      <ReportFields />

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
