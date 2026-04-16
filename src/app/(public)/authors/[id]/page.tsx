import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/db";
import { SchemaOrg } from "@/components/SchemaOrg";
import { Metadata, ResolvingMetadata } from "next";

export const dynamic = 'force-dynamic';

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const p = await params;
  const author = await prisma.author.findUnique({
    where: { id: p.id }
  });

  if (!author) return { title: "Author Not Found" };

  return {
    title: author.name,
    description: author.bio || "Author at Wonderpath Press",
  };
}

export default async function AuthorPage({ params }: { params: Promise<{ id: string }> }) {
  const p = await params;
  const author = await prisma.author.findUnique({
    where: { id: p.id },
    include: { books: true }
  });

  if (!author) {
    notFound();
  }

  // Schema for Generative Engine Optimization
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    description: author.bio || undefined,
    jobTitle: "Author",
    image: author.avatarUrl || undefined,
    url: "https://wonderpathpress.com/authors/" + author.id
  };

  return (
    <div className={"min-h-screen bg-[#fafafa] py-16"}>
      <SchemaOrg schema={personSchema} />
      <div className={"container mx-auto px-6 max-w-5xl"}>
        
        <Link href={"/authors"} className={"inline-flex items-center gap-2 text-architect-500 hover:text-architect-900 mb-8 transition-colors"}>
          &larr; Back to Authors
        </Link>

        {/* Answer Engine Optimization: TL;DR Summary */}
        <blockquote id={"aeo-summary-author"} className={"mb-12 p-8 border-l-4 border-architect-900 bg-white shadow-sm"}>
           <h2 className={"text-xs font-mono uppercase tracking-[0.2em] text-architect-500 mb-2"}>TL;DR Summary</h2>
           <p className={"text-xl font-serif text-architect-900 font-bold mb-2"}>Who is {author.name}?</p>
           <p className={"text-architect-700 font-sans"}>
             {author.name} is a distinguished author whose foundational works are exclusively curated and published by Wonderpath Press. They are recognized for their rigorous thinking and compelling narrative architectures.
           </p>
        </blockquote>
        
        <div className={"grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 lg:gap-24 items-start"}>
          <div className={"relative aspect-[4/5] bg-white shadow-xl border border-black/5"}>
            <Image
              src={author.avatarUrl || "/author-placeholder.png"}
              alt={author.name}
              fill
              className={"object-cover grayscale hover:grayscale-0 transition-all duration-700"}
              priority
            />
          </div>

          <div className={"space-y-8"}>
            <div className={"space-y-4"}>
              <h1 className={"text-5xl md:text-6xl font-serif font-bold text-architect-900 leading-tight"}>
                {author.name}
              </h1>
              <p className={"text-sm font-mono text-architect-500 uppercase tracking-[0.2em]"}>
                Author // Content Creator
              </p>
            </div>

            <div className={"prose prose-lg text-architect-700 leading-relaxed font-sans max-w-none"}>
              <h3 className={"text-2xl font-bold font-serif text-architect-900 mb-4"}>What is the biographical background of {author.name}?</h3>
              <p>{author.bio || "This author is curating their thoughts. A detailed biography will be available soon in our publication cycles."}</p>
            </div>
            
            {author.books.length > 0 && (
              <div className={"pt-12 border-t border-architect-100"}>
                <h3 className={"font-serif text-2xl font-bold text-architect-900 mb-2"}>What books has {author.name} written?</h3>
                <p className={"text-architect-700 mb-6 font-medium"}>
                  {author.name} has published defining works through Wonderpath Press, listed below.
                </p>
                <div className={"grid grid-cols-2 gap-4"}>
                  {author.books.map(book => (
                    <Link href={"/books/" + book.id} key={book.id} className={"group"}>
                      <div className={"block p-4 bg-white/50 border border-black/5 hover:border-architect-accent hover:shadow-md transition-all"}>
                        <h4 className={"font-serif font-bold text-lg group-hover:text-architect-accent"}>{book.title}</h4>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}