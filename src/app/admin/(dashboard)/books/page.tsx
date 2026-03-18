import Link from "next/link";
import prisma from "@/lib/db";
import { Plus, Pencil, ExternalLink } from "lucide-react";
import { DeleteBookButton } from "@/components/admin/DeleteBookButton";

export const dynamic = 'force-dynamic';

export default async function BooksPage() {
  const books = await prisma.book.findMany({
    orderBy: { createdAt: 'desc' },
    include: { author: true },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-serif text-foreground">Books</h1>
        <Link 
          href="/admin/books/new"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Book
        </Link>
      </div>

      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
            <tr>
              <th className="px-6 py-4 font-medium">Book</th>
              <th className="px-6 py-4 font-medium">Author</th>
              <th className="px-6 py-4 font-medium">Price</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {books.length === 0 ? (
              <tr>
                <td colSpan= {4} className="px-6 py-8 text-center text-muted-foreground">
                  No books found. Click &quot;Add Book&quot; to create one.
                </td>
              </tr>
            ) : (
              books.map((book) => (
                <tr key={book.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-8 bg-muted rounded overflow-hidden shrink-0">
                        <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{book.title}</div>
                        {book.tag && (
                          <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                            {book.tag}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {book.author.name}
                  </td>
                  <td className="px-6 py-4 font-medium">
                    ${book.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <a 
                        href={book.amazonLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors text-muted-foreground hover:bg-accent hover:text-accent-foreground h-8 w-8"
                        title="View on Amazon"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span className="sr-only">View on Amazon</span>
                      </a>
                      <Link 
                        href={`/admin/books/${book.id}/edit`}
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-8 w-8"
                        title="Edit Book"
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Link>
                      <DeleteBookButton id={book.id} />
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

