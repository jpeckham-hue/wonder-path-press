"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Setting a fake authentication cookie for middleware demonstration
    document.cookie = "admin_session=true; path=/; max-age=86400";
    setTimeout(() => {
      router.push("/admin/dashboard");
    }, 500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-card p-8 shadow-lg border">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <h2 className="mt-6 text-3xl font-bold font-serif tracking-tight text-foreground">
            Backstage Access
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Wonder Path Press | Admin Portal
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  placeholder="admin@wonderpath.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  placeholder=""
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full justify-center rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 transition-all"
          >
            {isLoading ? "Unlocking..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
