import Link from "next/link";
import prisma from "@/lib/db";
import { Plus, Pencil } from "lucide-react";
import { DeleteAuthorButton } from "@/components/admin/DeleteAuthorButton";

export const dynamic = 'force-dynamic';

export default async function AuthorsPage() {
  const authors = await prisma.author.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-serif text-foreground">Authors</h1>
        <Link 
          href="/admin/authors/new"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Author
        </Link>
      </div>

      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
            <tr>
              <th className="px-6 py-4 font-medium">Author</th>
              <th className="px-6 py-4 font-medium">Bio</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {authors.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-muted-foreground">
                  No authors found. Click &quot;Add Author&quot; to create one.
                </td>
              </tr>
            ) : (
              authors.map((author) => (
                <tr key={author.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {author.avatarUrl ? (
                        <div className="h-10 w-10 bg-muted rounded-full overflow-hidden shrink-0 relative">
                          <img src={author.avatarUrl} alt={author.name} className="absolute inset-0 w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="h-10 w-10 bg-primary/20 rounded-full flex items-center justify-center shrink-0">
                          <span className="text-primary font-bold">{author.name.charAt(0)}</span>
                        </div>
                      )}
                      <div className="font-medium text-foreground">{author.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    <div className="line-clamp-2">{author.bio || "No bio provided."}</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link 
                        href={`/admin/authors/${author.id}/edit`}
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-8 w-8"
                        title="Edit Author"
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Link>
                      <DeleteAuthorButton id={author.id} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
