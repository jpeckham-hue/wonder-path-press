import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BlogPost({ params }: { params: { slug: string } }) {
  // In a real app, fetch data based on params.slug
  const post = {
    title: "The Magic of Storytelling",
    date: "October 12, 2025",
    author: "Luna Bright",
    category: "Writing",
    image: "/blog-placeholder.png",
    content: `
      <p>Once upon a time, in a world not so different from our own, stories were the threads that held the universe together. For children, stories are more than just entertainment; they are the maps they use to navigate the complexities of life.</p>
      <p>When we read to our children, we are doing more than teaching them literacy. We are teaching them empathy. We are showing them that it is possible to be brave in the face of dragons, and that kindness is a superpower that can change the world.</p>
      <h3>Why Fairy Tales Matter</h3>
      <p>Einstein once said, "If you want your children to be intelligent, read them fairy tales. If you want them to be more intelligent, read them more fairy tales."</p>
      <p>Fairy tales operate on a level of deep symbolism. They speak to the unconscious mind, helping children resolve inner conflicts and understand the eternal struggle between good and evil, fear and courage.</p>
    `
  };

  return (
    <article className="min-h-screen bg-background pb-24">
      {/* Hero Image */}
      <div className="relative h-[400px] w-full bg-muted">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover brightness-75"
          priority
        />
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
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">LB</div>
                    <div>
                        <p className="text-sm font-bold text-foreground">{post.author}</p>
                        <p className="text-xs">{post.date}</p>
                    </div>
                </div>
                <span className="px-3 py-1 bg-muted rounded-full text-xs font-bold uppercase tracking-wider">
                    {post.category}
                </span>
            </div>

            {/* Content */}
            <div 
                className="prose prose-lg prose-zinc dark:prose-invert max-w-none 
                prose-headings:font-serif prose-headings:font-bold prose-headings:text-primary
                prose-p:text-muted-foreground prose-p:leading-relaxed
                prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                "
                dangerouslySetInnerHTML={{ __html: post.content }} 
            />
        </div>
      </div>
    </article>
  );
}