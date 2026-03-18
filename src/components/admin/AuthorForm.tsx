"use client";

import { useTransition } from "react";
import { createAuthor, updateAuthor } from "@/app/admin/(dashboard)/authors/actions";
import Link from "next/link";

export function AuthorForm({ initialData = null }: { initialData?: any }) {
  const [isPending, startTransition] = useTransition();
  const isEditing = !!initialData;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    startTransition(() => {
      if (isEditing) {
        updateAuthor(initialData.id, formData);
      } else {
        createAuthor(formData);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="space-y-4">
        <div className="grid gap-2">
          <label htmlFor="name" className="text-sm font-medium">Name *</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            required 
            defaultValue={initialData?.name || ""}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        
        <div className="grid gap-2">
          <label htmlFor="bio" className="text-sm font-medium">Biography</label>
          <textarea 
            id="bio" 
            name="bio" 
            rows={5}
            defaultValue={initialData?.bio || ""}
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="avatarUrl" className="text-sm font-medium">Avatar URL</label>
          <input 
            type="url" 
            id="avatarUrl" 
            name="avatarUrl" 
            defaultValue={initialData?.avatarUrl || ""}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button 
          type="submit" 
          disabled={isPending}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          {isPending ? "Saving..." : isEditing ? "Update Author" : "Create Author"}
        </button>
        <Link 
          href="/admin/authors"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}

