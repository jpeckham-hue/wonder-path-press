import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/db";

export const dynamic = 'force-dynamic';

export default async function AuthorsPage() {
  const authors = await prisma.author.findMany({
    orderBy: { name: 'asc' }
  });

  return (
    <div className="min-h-screen bg-[#fafafa] py-24 md:py-32 selection:bg-architect-accent selection:text-white">
      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <div className="max-w-3xl mb-24 space-y-6">
          <span className="font-mono text-architect-500 uppercase tracking-[0.3em] text-xs font-semibold">The Roster</span>
          <h1 className="text-5xl md:text-7xl font-bold font-serif text-architect-900 tracking-tight leading-[1.1]">
            Architects <span className="italic font-light text-architect-500">&</span> Dreamers
          </h1>
          <p className="text-xl text-architect-700 leading-relaxed font-sans max-w-2xl">
            Meet the rigorous thinkers and whimsical creators constructing the worlds within our pages.
          </p>
        </div>

        {/* Dynamic Authors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-24">
          {authors.map((author) => (
            <div key={author.id} className="group flex flex-col items-start space-y-8">
              
              <div className="relative w-full aspect-[4/5] overflow-hidden border border-black/5 bg-white shadow-xl group-hover:shadow-2xl transition-all duration-500">
                <Image
                  src={author.avatarUrl || "/author-placeholder.png"}
                  alt={author.name}
                  fill
                  className="object-cover filter grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-700 origin-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-architect-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              <div className="space-y-4 w-full border-b border-architect-100 pb-8">
                <h3 className="font-serif text-3xl font-bold text-architect-900 group-hover:text-architect-accent transition-colors duration-300">
                  {author.name}
                </h3>
                
                {/* Fallback Role Text since author.role isn't in db */}
                <p className="text-xs font-mono text-architect-500 uppercase tracking-[0.2em]">
                  Author
                </p>
                
                <p className="text-architect-700 text-sm leading-relaxed max-w-md line-clamp-4">
                  {author.bio || "This author is currently curating their thoughts. A biography will be available soon in our upcoming publication cycles."}
                </p>
              </div>
            </div>
          ))}
          
          {authors.length === 0 && (
            <div className="col-span-full py-20 text-center text-architect-500 font-mono tracking-widest uppercase">
              No authors have been curated yet.
            </div>
          )}
        </div>

        {/* CTA Footer */}
        <div className="mt-32 p-12 lg:p-24 bg-architect-900 text-white flex flex-col items-center text-center space-y-8">
          <span className="font-mono text-architect-300 uppercase tracking-[0.3em] text-xs font-semibold">Join The Cohort</span>
          <h2 className="text-4xl lg:text-5xl font-serif font-black">Submit a Manuscript</h2>
          <p className="text-architect-300 text-lg max-w-xl mx-auto font-light">
            We are continuously evaluating avant-garde voices and methodical researchers. If your story wanders off the beaten path, we invite your submission.
          </p>
          <div className="pt-8">
            <Link 
              href="/contact" 
              className="px-10 py-5 bg-white text-architect-900 font-mono text-xs uppercase tracking-[0.2em] hover:bg-architect-accent hover:text-white transition-colors duration-300 shadow-xl"
            >
              Begin Submissions
            </Link>
          </div>
        </div>
        
      </div>
    </div>
  );
}
