import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import prisma from "@/lib/db";
import { Metadata, ResolvingMetadata } from "next";

export const dynamic = 'force-dynamic';

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const p = await params;
  const book = await prisma.book.findUnique({
    where: { id: p.id },
    include: { author: true }
  });

  if (!book) return { title: "Book Not Found" };

  return {
    title: book.title,
    description: book.description,
    openGraph: {
      title: book.title,
      description: book.description,
      images: [book.image],
    }
  };
}

export default async function BookPage({ params }: { params: Promise<{ id: string }> }) {
  const p = await params;
  const book = await prisma.book.findUnique({
    where: { id: p.id },
    include: { author: true }
  });

  if (!book) {
    notFound();
  }

  return (
    <div className={"min-h-screen bg-background py-16"}>
      <div className={"container px-4"}>
        
        <Link href={"/books" } className={"inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-12 transition-colors"}>
          <ArrowLeft size={20} />
          Back to Library
        </Link>
        
        <div className={"grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-start"}>
           <div className={"relative aspect-[3/4] bg-muted rounded-3xl overflow-hidden shadow-lg border"}>
            {book.tag && (
              <span className={"absolute top-6 left-6 z-10 px-4 py-1.5 bg-secondary text-secondary-foreground text-sm font-bold uppercase tracking-wider rounded-full shadow-md"}>
                {book.tag}
              </span>
            )}
            <Image
              src={book.image}
              alt={"Cover of " + book.title}
              fill
              sizes={"(max-width: 768px) 100vw, 50vw"}
              className={"object-cover"}
              priority
            />
          </div>

          <div className={"flex flex-col space-y-8 py-4"}>
            <div className={"space-y-4"}>
              <h1 className={"text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-tight"}>
                {book.title}
              </h1>
              <p className={"text-xl md:text-2xl text-muted-foreground font-medium"}>
                Written by <span className={"text-primary"}>{book.author.name}</span>
              </p>
            </div>

            <div className={"prose prose-lg dark:prose-invert"}>
              <p className={"text-foreground/80 leading-relaxed"}>
                {book.description}
              </p>
            </div>

            <div className={"pt-8 border-t space-y-6"}>
              <div className={"flex items-center justify-between"}>
                <span className={"text-4xl font-bold text-primary"}>${book.price.toFixed(2)}</span>
                <span className={"text-sm font-medium text-muted-foreground uppercase tracking-wider px-3 py-1 bg-muted rounded-md"}>
                  Hardcover
                </span>
              </div>
              
              <a 
                href={book.amazonLink}
                target={"_blank"}
                rel={"noopener noreferrer"}
                className={"w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-accent text-accent-foreground text-lg font-bold rounded-2xl hover:bg-accent/90 transition-all shadow-md hover:shadow-lg hover:-translate-y-1"}
              >
                <ShoppingCart size={24} />
                Purchase on Amazon
              </a>
            </div>

            {book.author.bio && (
              <div className={"mt-12 p-6 bg-card rounded-2xl border shadow-sm space-y-3"}>
                <h3 className={"font-serif text-lg font-bold"}>About {book.author.name}</h3>
                <p className={"text-muted-foreground text-sm leading-relaxed"}>
                  {book.author.bio}
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}