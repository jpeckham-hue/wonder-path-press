import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Mock Data for Blog Posts
const POSTS = [
  {
    slug: "magic-of-storytelling",
    title: "The Magic of Storytelling",
    excerpt: "Why fairy tales are essential for childhood development and how to weave magic into everyday life.",
    date: "October 12, 2025",
    author: "Luna Bright",
    image: "/blog-placeholder.png",
    category: "Writing"
  },
  {
    slug: "creating-worlds",
    title: "Creating Worlds from Scratch",
    excerpt: "A peek behind the curtain at how we design the magical forests and starry skies in our books.",
    date: "September 28, 2025",
    author: "Elena Vance",
    image: "/blog-placeholder.png",
    category: "Illustration"
  },
  {
    slug: "reading-at-bedtime",
    title: "The Importance of Bedtime Reading",
    excerpt: "Creating a nightly ritual that fosters connection, imagination, and sweet dreams.",
    date: "September 15, 2025",
    author: "Dr. Aris Vane",
    image: "/blog-placeholder.png",
    category: "Parenting"
  }
];

export default function BlogPage() {
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

        {/* Featured Post (First one) */}
        <div className="mb-16">
           <Link href={`/blog/${POSTS[0].slug}`} className="group relative block rounded-3xl overflow-hidden aspect-[21/9] bg-muted">
              <Image
                src={POSTS[0].image}
                alt={POSTS[0].title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 md:p-12 flex flex-col justify-end text-white">
                <div className="max-w-3xl space-y-4">
                  <span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground text-xs font-bold uppercase tracking-wider rounded-full">
                    {POSTS[0].category}
                  </span>
                  <h2 className="text-3xl md:text-5xl font-bold font-serif group-hover:text-secondary transition-colors">
                    {POSTS[0].title}
                  </h2>
                  <p className="text-zinc-200 text-lg md:text-xl line-clamp-2 max-w-2xl">
                    {POSTS[0].excerpt}
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
          {POSTS.slice(1).map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col space-y-4">
              <div className="relative aspect-[3/2] rounded-2xl overflow-hidden bg-muted">
                 <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
              </div>
              <div className="space-y-2">
                 <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    <span className="text-primary">{post.category}</span>
                    <span></span>
                    <span>{post.date}</span>
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
      </div>
    </div>
  );
}
