"use client";
import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteUser } from "@/app/admin/(dashboard)/users/actions";

export function DeleteUserButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => {
        if (confirm("Are you sure you want to remove this user?")) {
          startTransition(() => deleteUser(id));
        }
      }}
      disabled={isPending}
      className="inline-flex items-center justify-center rounded-md text-sm font-medium text-destructive hover:bg-destructive/10 h-8 w-8 disabled:opacity-50"
      title="Remove User"
    >
      <Trash2 className="h-4 w-4" />
      <span className="sr-only">Delete</span>
    </button>
  );
}
