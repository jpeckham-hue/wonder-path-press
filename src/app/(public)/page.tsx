import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import prisma from "@/lib/db";
import { BookCard } from "@/components/ui/BookCard";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PublishingHouse",
    "name": "Wonderpath Press",
    "url": "https://wonderpathpress.com",
    "logo": "https://wonderpathpress.com/logo.png",
    "description": "Boutique children's book publisher blending whimsical storytelling with vibrant illustrations."
  };

  const featuredBooks = await prisma.book.findMany({
    take: 3,
    include: { author: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <>
      <Script id="org-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary selection:text-white">
        
        {/* HERO SECTION */}
        <section className="relative w-full min-h-[90vh] flex items-center justify-center pt-24 pb-12 overflow-hidden bg-card">
          <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-secondary via-transparent to-transparent opacity-80" />
          <div className="container px-6 z-10 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            <div className="flex flex-col space-y-8 max-w-xl">
              <span className="font-mono text-accent uppercase tracking-[0.3em] text-xs font-semibold">New Adventure Awaits</span>
              <h1 className="text-5xl md:text-7xl font-serif font-black leading-[1.1] tracking-tight text-primary">
                Wonder <br/>
                <span className="italic font-light text-accent">&amp;</span> Imagination.
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed font-sans max-w-md">
                Dive into magical worlds with our beautifully illustrated stories that spark joy and curiosity in young minds.
              </p>
              
              <div className="flex items-center gap-6 pt-6">
                <Link href="/books" className="px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-accent transition-colors duration-300 shadow-xl hover:shadow-2xl translate-y-0 hover:-translate-y-1">
                  Explore Library
                </Link>
                <Link href="/mission" className="font-bold text-sm tracking-widest text-muted-foreground hover:text-primary transition-colors duration-300 border-b border-transparent hover:border-primary pb-1">
                  Our Story
                </Link>
              </div>
            </div>

            <div className="relative w-full h-[600px] flex justify-center items-center group perspective-1000">
              <div className="relative w-[340px] h-[340px] shadow-2xl transition-transform duration-700 transform-gpu group-hover:rotate-6 group-hover:scale-105 rounded-3xl overflow-hidden border-4 border-wpp-cream bg-white">
                <Image
                  src="/hero.png"
                  alt="Childrens Book Illustration"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-opacity duration-500"
                  priority
                />
              </div>
            </div>

          </div>
        </section>

        {/* MAGICAL BOOKSHELF */}
        <section className="py-32 bg-background">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-end mb-20 border-b border-muted pb-8">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary">Featured Stories</h2>
              <Link href="/books" className="hidden md:block font-bold text-sm uppercase tracking-widest text-accent hover:text-primary transition-colors">View All Books &rarr;</Link>
            </div>

            {featuredBooks.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p className="text-xl font-medium mb-4">Our bookshelf is currently empty!</p>
                <p>Please add some books in the Admin Dashboard.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                {featuredBooks.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            )}
            
          </div>
        </section>
      </div>
    </>
  );
}
