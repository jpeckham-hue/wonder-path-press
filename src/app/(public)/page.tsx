import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PublishingHouse",
    "name": "Wonderpath Press",
    "url": "https://wonderpathpress.com",
    "logo": "https://wonderpathpress.com/logo.png",
    "description": "Boutique publisher blending technical prestige with artistic whimsy."
  };

  return (
    <>
      <Script id="org-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="flex flex-col min-h-screen bg-white text-architect-900 selection:bg-architect-accent selection:text-white">
        
        {/* PREMIUM FLAGSHIP HERO */}
        <section className="relative w-full min-h-[90vh] flex items-center justify-center pt-24 pb-12 overflow-hidden bg-[#fafafa]">
          <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-architect-100 via-transparent to-transparent opacity-80" />
          <div className="container px-6 z-10 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Typography Left */}
            <div className="flex flex-col space-y-8 max-w-xl">
              <span className="font-mono text-architect-500 uppercase tracking-[0.3em] text-xs font-semibold">Flagship Release</span>
              <h1 className="text-5xl md:text-7xl font-serif font-black leading-[1.1] tracking-tight">
                Design <br/>
                <span className="italic font-light text-architect-500">&</span> Systems.
              </h1>
              <p className="text-lg text-architect-700 leading-relaxed font-sans max-w-md">
                An authoritative exploration into the intersection of modern architecture, software engineering, and the spaces we inhabit. Limited First Edition.
              </p>
              
              <div className="flex items-center gap-6 pt-6">
                <Link href="/books" className="px-8 py-4 bg-architect-900 text-white font-mono text-xs uppercase tracking-[0.2em] hover:bg-architect-accent transition-colors duration-300 shadow-xl hover:shadow-2xl translate-y-0 hover:-translate-y-1">
                  Secure Your Copy
                </Link>
                <Link href="/mission" className="font-mono text-xs uppercase tracking-widest text-architect-500 hover:text-architect-900 transition-colors duration-300 border-b border-transparent hover:border-architect-900 pb-1">
                  The Blueprint
                </Link>
              </div>
            </div>

            {/* 3D Mockup Right */}
            <div className="relative w-full h-[600px] flex justify-center items-center group perspective-1000">
              <div className="relative w-[340px] h-[480px] shadow-2xl transition-transform duration-700 transform-gpu group-hover:rotate-y-12 group-hover:rotate-x-12 group-hover:scale-105 border border-black/5 bg-white">
                <Image
                  src="/hero.png" // Placeholder
                  alt="Design & Systems Book Mockup"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-opacity duration-500"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent pointer-events-none mix-blend-overlay" />
              </div>
            </div>

          </div>
        </section>

        {/* ASYMMETRICAL MAGAZINE GRID */}
        <section className="py-32 bg-white">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-end mb-20 border-b border-architect-100 pb-8">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-architect-900">Curated Library</h2>
              <Link href="/books" className="hidden md:block font-mono text-xs uppercase tracking-widest text-architect-500 hover:text-architect-900 transition-colors">View Complete Collection &rarr;</Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-8">
              
              {/* Large Feature (Col span 7) */}
              <div className="col-span-1 md:col-span-7 group cursor-pointer">
                <div className="relative aspect-[4/3] bg-architect-100 mb-8 overflow-hidden">
                  <div className="absolute inset-0 bg-architect-900/5 group-hover:bg-transparent transition-colors z-10" />
                  <Image src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80" alt="Book 1" fill className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105" />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-3xl font-serif font-bold mb-3 group-hover:text-architect-accent transition-colors">The Architect's Canvas</h3>
                    <p className="text-architect-500 text-lg">Hub A — Jeff Peckham</p>
                  </div>
                  <span className="font-mono text-sm tracking-widest">2026</span>
                </div>
              </div>

              {/* Stacked Small Features (Col span 5) */}
              <div className="col-span-1 md:col-span-5 flex flex-col gap-16 justify-between">
                
                <div className="group cursor-pointer">
                  <div className="relative aspect-square bg-dreamer-100 mb-6 overflow-hidden rounded-bl-[60px] rounded-tr-[60px]">
                    <div className="absolute inset-0 bg-dreamer-900/5 group-hover:bg-transparent transition-colors z-10" />
                    <Image src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80" alt="Book 2" fill className="object-cover group-hover:scale-105 transition-all duration-700" />
                  </div>
                  <h3 className="text-xl font-serif font-bold mb-2 group-hover:text-dreamer-700 transition-colors">The Whispering Willow</h3>
                  <p className="text-dreamer-500 text-sm font-medium">Hub B — Clara Skye</p>
                </div>

                <div className="group cursor-pointer">
                  <div className="relative aspect-[16/9] bg-architect-100 mb-6 overflow-hidden">
                    <Image src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80" alt="Book 3" fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                  </div>
                  <h3 className="text-xl font-serif font-bold mb-2">Systems of Scale</h3>
                  <p className="text-architect-500 text-sm font-medium">Hub A — Jeff Peckham</p>
                </div>

              </div>
            </div>
            
          </div>
        </section>
      </div>
    </>
  );
}
