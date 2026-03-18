"use client";

import { useTransition } from "react";
import { createBook, updateBook } from "@/app/admin/(dashboard)/books/actions";
import Link from "next/link";
import { Author } from "@prisma/client";

export function BookForm({ initialData = null, authors }: { initialData?: any, authors: Author[] }) {
  const [isPending, startTransition] = useTransition();
  const isEditing = !!initialData;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    startTransition(() => {
      if (isEditing) {
        updateBook(initialData.id, formData);
      } else {
        createBook(formData);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="space-y-4">
        <div className="grid gap-2">
          <label htmlFor="title" className="text-sm font-medium">Title *</label>
          <input 
            type="text" 
            id="title" 
            name="title" 
            required 
            defaultValue={initialData?.title || ""}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="authorId" className="text-sm font-medium">Author *</label>
          <select 
            id="authorId" 
            name="authorId" 
            required 
            defaultValue={initialData?.authorId || ""}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="" disabled>Select an author</option>
            {authors.map(author => (
              <option key={author.id} value={author.id}>{author.name}</option>
            ))}
          </select>
        </div>
        
        <div className="grid gap-2">
          <label htmlFor="description" className="text-sm font-medium">Description *</label>
          <textarea 
            id="description" 
            name="description" 
            rows={5}
            required
            defaultValue={initialData?.description || ""}
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <label htmlFor="price" className="text-sm font-medium">Price ($) *</label>
            <input 
              type="number" 
              id="price" 
              name="price" 
              step="0.01"
              required 
              defaultValue={initialData?.price || ""}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="tag" className="text-sm font-medium">Tag (e.g., 'Bestseller')</label>
            <input 
              type="text" 
              id="tag" 
              name="tag" 
              defaultValue={initialData?.tag || ""}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>

        <div className="grid gap-2">
          <label htmlFor="image" className="text-sm font-medium">Cover Image URL *</label>
          <input 
            type="url" 
            id="image" 
            name="image" 
            required
            defaultValue={initialData?.image || ""}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="amazonLink" className="text-sm font-medium">Amazon Link URL *</label>
          <input 
            type="url" 
            id="amazonLink" 
            name="amazonLink" 
            required
            defaultValue={initialData?.amazonLink || ""}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background mile:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

      </div>

      <div className="flex items-center gap-4">
        <button 
          type="submit" 
          disabled={isPending}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          {isPending ? "Saving..." : isEditing ? "Update Book" : "Create Book"}
        </button>
        <Link 
          href="/admin/books"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}

