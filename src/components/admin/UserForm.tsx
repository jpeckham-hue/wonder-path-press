"use client";
import { useTransition } from "react";
import { createUser } from "@/app/admin/(dashboard)/users/actions";
import Link from "next/link";

export function UserForm() {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => {
      createUser(formData);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
      <div className="space-y-4">
        <div className="grid gap-2">
          <label htmlFor="name" className="text-sm font-medium">Display Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="email" className="text-sm font-medium">Email *</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            required 
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="password" className="text-sm font-medium">Password *</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            required 
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button 
          type="submit" 
          disabled={isPending}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 disabled:opacity-50"
        >
          {isPending ? "Adding..." : "Add Admin"}
        </button>
        <Link 
          href="/admin/users"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
