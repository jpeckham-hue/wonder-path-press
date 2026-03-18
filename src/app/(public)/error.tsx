"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
          <AlertCircle className="h-10 w-10 text-red-600 dark:text-red-500" />
        </div>
        
        <div className="space-y-2">
            <h2 className="text-3xl font-bold font-serif text-foreground">Something went wrong</h2>
            <p className="text-muted-foreground">
              We're having trouble loading this page right now. Our team has been notified.
            </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-center">
            <button
                onClick={() => reset()}
                className="rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-sm hover:bg-primary/90 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
                Try Again
            </button>
            <Link
                href="/"
                className="rounded-full bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground px-6 py-3 text-sm font-bold transition-all"
            >
                Return Home
            </Link>
        </div>
      </div>
    </div>
  );
}
