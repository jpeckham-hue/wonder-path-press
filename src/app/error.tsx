"use client";

import { useEffect } from "react";
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
    <div className="flex-1 flex flex-col items-center justify-center min-h-[50vh] px-4 text-center space-y-6">
      <div className="w-16 h-16 bg-destructive/10 text-destructive rounded-full flex items-center justify-center">
        <AlertCircle size={32} />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold font-serif text-foreground">A Magical Mishap Occurred</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          We encountered a slight magical disturbance while trying to load this path. 
        </p>
      </div>
      <button
        onClick={() => reset()}
        className="px-6 py-2 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}
