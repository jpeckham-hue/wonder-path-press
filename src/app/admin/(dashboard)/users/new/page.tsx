import { UserForm } from "@/components/admin/UserForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewUserPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/users" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-10 w-10">
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Back</span>
        </Link>
        <h1 className="text-3xl font-bold font-serif text-foreground">Add New Team Member</h1>
      </div>
      <UserForm />
    </div>
  );
}
