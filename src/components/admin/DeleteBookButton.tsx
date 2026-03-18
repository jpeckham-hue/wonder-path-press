"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteBook } from "@/app/admin/(dashboard)/books/actions";

export function DeleteBookButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this book? This cannot be undone.")) {
      startTransition(() => {
        deleteBook(id);
      });
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isPending}
      className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors text-destructive hover:bg-destructive/10 disabled:opacity-50 h-8 w-8"
      title="Delete Book"
    >
      <Trash2 className="h-4 w-4" />
      <span className="sr-only">Delete</span>
    </button>
  );
}


