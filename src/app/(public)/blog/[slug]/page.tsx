import prisma from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { marked } from "marked";

export const dynamic = 'force-dynamic';

export default async function BlogPost({ params }: { params: { slug: string } }) {
  // @ts-ignore
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug: slug, published: true },
    include: { author: true }
  });

  if (!post) {
    notFound();
  }

  const contentHtml = await marked(post.content);

  return (
    <article className="min-h-screen bg-background pb-24">
      {/* Hero Image */}
      <div className="relative h-[400px] w-full bg-muted">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover brightness-75"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-primary/20" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
            <div className="container px-4">
                <Link href="/blog" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors font-medium">
                    <ArrowLeft size={18} /> Back to Blog
                </Link>
                <h1 className="text-4xl md:text-6xl font-bold font-serif text-white max-w-4xl shadow-sm">
                    {post.title}
                </h1>
            </div>
        </div>
      </div>

      <div className="container px-4 py-12">
        <div className="max-w-3xl mx-auto">
            {/* Meta */}
            <div className="flex items-center justify-between border-b pb-8 mb-8 text-muted-foreground">
                <div className="flex items-center gap-2">
                    {post.author.avatarUrl ? (
                      <div className="w-10 h-10 rounded-full bg-primary overflow-hidden relative">
                         <Image src={post.author.avatarUrl} alt={post.author.name} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                        {post.author.name.charAt(0)}
                      </div>
                    )}
                    <div>
                        <p className="text-sm font-bold text-foreground">{post.author.name}</p>
                        <p className="text-xs">{new Date(post.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div 
                className="prose prose-lg prose-zinc dark:prose-invert max-w-none 
                prose-headings:font-serif prose-headings:font-bold prose-headings:text-primary
                prose-p:text-muted-foreground prose-p:leading-relaxed
                prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                "
                dangerouslySetInnerHTML={{ __html: contentHtml }} 
            />
        </div>
      </div>
    </article>
  );
}
