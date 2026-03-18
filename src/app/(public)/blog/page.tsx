import prisma from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { author: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="min-h-screen bg-background py-16 md:py-24">
      <div className="container px-4">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-primary">The Storyteller's Corner</h1>
          <p className="text-lg text-muted-foreground">
            Musings on writing, illustration, and the joy of raising little readers.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">No blog posts found. Check back later!</div>
        ) : (
          <>
            {/* Featured Post (First one) */}
            <div className="mb-16">
               <Link href={`/blog/${posts[0].slug}`} className="group relative block rounded-3xl overflow-hidden aspect-[21/9] bg-muted">
                  {posts[0].coverImage ? (
                    <Image
                      src={posts[0].coverImage}
                      alt={posts[0].title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-primary/10 group-hover:scale-105 transition-transform duration-700" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 md:p-12 flex flex-col justify-end text-white">
                    <div className="max-w-3xl space-y-4">
                      <h2 className="text-3xl md:text-5xl font-bold font-serif group-hover:text-secondary transition-colors">
                        {posts[0].title}
                      </h2>
                      <p className="text-zinc-200 text-lg md:text-xl line-clamp-2 max-w-2xl">
                        {posts[0].excerpt}
                      </p>
                      <span className="inline-flex items-center gap-2 font-bold text-secondary">
                        Read Article <ArrowRight size={18} />
                      </span>
                    </div>
                  </div>
               </Link>
            </div>

            {/* Recent Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.slice(1).map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col space-y-4">
                  <div className="relative aspect-[3/2] rounded-2xl overflow-hidden bg-muted">
                    {post.coverImage ? (
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-primary/10 group-hover:scale-105 transition-transform duration-500" />
                    )}
                  </div>
                  <div className="space-y-2">
                     <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        <span className="text-primary">{post.author.name}</span>
                        <span></span>
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                     </div>
                     <h3 className="text-2xl font-bold font-serif group-hover:text-primary transition-colors">
                        {post.title}
                     </h3>
                     <p className="text-muted-foreground line-clamp-3">
                        {post.excerpt}
                     </p>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
