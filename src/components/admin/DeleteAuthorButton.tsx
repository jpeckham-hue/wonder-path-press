"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteAuthor } from "@/app/admin/(dashboard)/authors/actions";

export function DeleteAuthorButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this author? This cannot be undone.")) {
      startTransition(async () => {
        try {
          const res = await deleteAuthor(id);
          if (res && res.error) {
            alert(res.error);
          }
        } catch (error: any) {
          alert("Failed to delete author: Server error.");
        }
      });
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isPending}
      className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors text-destructive hover:bg-destructive/10 disabled:opacity-50 h-8 w-8"
      title="Delete Author"
    >
      <Trash2 className="h-4 w-4" />
      <span className="sr-only">Delete</span>
    </button>
  );
}
