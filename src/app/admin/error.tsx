"use client";

import { useEffect } from "react";
import { CopyX } from "lucide-react";

export default function AdminErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin Error:", error);
  }, [error]);

  return (
    <div className="flex h-full min-h-[500px] flex-col items-center justify-center rounded-xl border border-red-200 bg-red-50/50 dark:border-red-900/30 dark:bg-red-900/10 p-8 text-center">
        <CopyX className="h-12 w-12 text-red-500 mb-4 opacity-80" />
        <h3 className="text-lg font-bold text-red-800 dark:text-red-400">Dashboard Widget Error</h3>
        <p className="mt-2 text-sm text-red-600/80 dark:text-red-400/80 max-w-sm">
            {error.message || "A component failed to render or fetch data properly."}
        </p>
        <button
            onClick={() => reset()}
            className="mt-6 rounded-md bg-red-100 px-4 py-2 text-sm font-medium text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50 transition-colors"
        >
            Reload Module
        </button>
    </div>
  );
}
