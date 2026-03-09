import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] w-full flex items-center justify-center text-center">
        <Image
          src="/hero.png"
          alt="Cozy library setting with warm magical lighting"
          fill
          sizes="100vw"
          className="object-cover brightness-50"
          priority
        />
        <div className="relative z-10 container px-4 space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white font-serif tracking-tight text-shadow-sm">
            Stories That Wander. <br/> Paths That Inspire.
          </h1>
          <p className="text-lg md:text-xl text-zinc-100 max-w-2xl mx-auto">
            Discover your next great adventure with Wonder Path Press. We publish books for the curious, the dreamers, and the seekers.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Link 
              href="/books" 
              className="px-8 py-3 bg-accent text-accent-foreground font-medium rounded-full hover:bg-accent/90 transition-colors"
            >
              Browse Books
            </Link>
            <Link 
              href="/authors" 
              className="px-8 py-3 bg-white/10 text-white border border-white/20 font-medium rounded-full hover:bg-white/20 transition-colors backdrop-blur-sm"
            >
              Meet Authors
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Books Section (Placeholder) */}
      <section className="py-20 bg-background">
        <div className="container px-4">
          <div className="flex flex-col items-center mb-12 space-y-4 text-center">
            <h2 className="text-3xl font-bold font-serif text-foreground">Latest Releases</h2>
            <p className="text-muted-foreground max-w-lg">
              Fresh from our press to your hands. Explore our newest additions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group relative bg-card rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-all">
                <div className="aspect-[2/3] bg-muted relative flex items-center justify-center">
                  <span className="text-muted-foreground">Book Cover {i}</span>
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="font-serif text-xl font-bold group-hover:text-accent transition-colors">The Wandering Soul</h3>
                  <p className="text-sm text-muted-foreground">By Author Name</p>
                  <p className="text-sm line-clamp-2">A beautiful journey through the unknown...</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
             <Link href="/books" className="text-accent hover:underline font-medium underline-offset-4">View All Books &rarr;</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

