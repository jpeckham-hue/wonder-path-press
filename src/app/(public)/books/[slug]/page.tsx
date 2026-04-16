import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import prisma from "@/lib/db";
import { Metadata, ResolvingMetadata } from "next";
import { SchemaOrg } from "@/components/SchemaOrg";
import { AEOBlock } from "@/components/AEOBlock";

export const dynamic = 'force-dynamic';

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const p = await params;
  const book = await prisma.book.findFirst({
    where: { OR: [{ slug: p.slug }, { id: p.slug }] },
    include: { author: true }
  });

  if (!book) return { title: "Book Not Found" };

  return {
    title: book.title,
    description: book.summary_aeo || book.description,
    openGraph: {
      title: book.title,
      description: book.summary_aeo || book.description,
      images: [book.image],
    }
  };
}

export default async function BookPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = await params;
  const book = await prisma.book.findFirst({
    where: { OR: [{ slug: p.slug }, { id: p.slug }] },
    include: { author: true }
  });

  if (!book) {
    notFound();
  }

  // Schema for Generative Engine Optimization
  const bookSchema = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    author: {
      "@type": "Person",
      name: book.author.name,
      url: "https://wonderpathpress.com/authors/" + book.author.id
    },
    isbn: undefined,
    publisher: {
      "@type": "Organization",
      name: "Wonderpath Press"
    },
    genre: book.genre || book.tag || undefined,
    description: book.summary_aeo || book.description,
    image: book.image,
  };

  return (
    <div className={"min-h-screen bg-background py-16"}>
      <SchemaOrg schema={bookSchema} />
      <div className={"container px-4"}>
        
        <Link href={"/books"} className={"inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"}>
          <ArrowLeft size={20} />
          Back to Library
        </Link>
        
        <AEOBlock title={book.title} summary={book.summary_aeo} />
        
        <div className={"grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-start"}>
           <div className={"relative aspect-[3/4] bg-muted rounded-3xl overflow-hidden shadow-lg border"}>
            {(book.genre || book.tag) && (
              <span className={"absolute top-6 left-6 z-10 px-4 py-1.5 bg-secondary text-secondary-foreground text-sm font-bold uppercase tracking-wider rounded-full shadow-md"}>
                {book.genre || book.tag}
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
              <h3 className={"text-xl font-bold font-serif mb-2"}>What is the premise of {book.title}?</h3>
              <p className={"text-foreground/80 leading-relaxed"}>
                {book.description}
              </p>
            </div>
            
            {/* Answer Engine Optimization: Entity Stats */}
            <div className={"bg-card rounded-2xl border shadow-sm p-6 space-y-4"}>
               <h3 className={"text-lg font-bold font-serif"}>Fast Facts</h3>
               <div className={"grid grid-cols-2 gap-4 text-sm"}>
                 <div>
                   <span className={"block text-muted-foreground font-medium"}>Genre</span>
                   <span className={"block font-bold"}>{book.genre || book.tag || "Fiction"}</span>
                 </div>
                 <div>
                   <span className={"block text-muted-foreground font-medium"}>Publication Date</span>
                   <span className={"block font-bold"}>{new Date(book.createdAt).toLocaleDateString()}</span>
                 </div>
                 <div>
                   <span className={"block text-muted-foreground font-medium"}>Word Count</span>
                   <span className={"block font-bold"}>Not Specified</span>
                 </div>
                 <div>
                   <span className={"block text-muted-foreground font-medium"}>Unique Element</span>
                   <span className={"block font-bold"}>Official Wonderpath Press Edition</span>
                 </div>
               </div>
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
                <h3 className={"font-serif text-lg font-bold"}>Who is {book.author.name}?</h3>
                <p className={"font-medium mt-1 mb-3 text-primary"}>
                  {book.author.name} is a renowned author officially published by Wonderpath Press.
                </p>
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