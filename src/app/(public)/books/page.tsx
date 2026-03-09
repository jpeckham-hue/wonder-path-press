import Image from "next/image";
import prisma from "@/lib/db";
import { BookCard } from "@/components/ui/BookCard";

export const dynamic = 'force-dynamic';

export default async function BooksPage() {
  const books = await prisma.book.findMany({
    include: {
      author: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div className="min-h-screen bg-background py-16 md:py-24">
      <div className="container px-4">
        <div className="max-w-2xl mx-auto text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-primary">Magical Library</h1>
          <p className="text-lg text-muted-foreground">
            Explore our collection of whimsical tales, colorful adventures, and heartwarming stories for curious minds.
          </p>
        </div>

        {books.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-xl font-medium">No books found in the library.</p>
            <p>Check back later or run the database seeder!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {books.map((book: any) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

