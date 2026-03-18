import { AuthorForm } from "@/components/admin/AuthorForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewAuthorPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/authors" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground h-10 w-10">
          <ArrowLeft size={20} />
          <span className="sr-only">Back</span>
        </Link>
        <h1 className="text-3xl font-bold font-serif text-foreground">Add New Author</h1>
      </div>
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <AuthorForm />
      </div>
    </div>
    );
}
