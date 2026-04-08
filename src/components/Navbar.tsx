import Link from "next/link";
import { MobileNav } from "./ui/MobileNav";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-black/5 transition-all duration-300">
      <div className="container mx-auto px-6 h-20 md:h-24 flex items-center justify-between">
        <Link href="/" className="font-serif text-3xl md:text-4xl font-black tracking-tight text-architect-900 hover:text-architect-500 transition-colors">
          WONDERPATH
        </Link>
        <div className="hidden md:flex items-center gap-10 text-sm font-bold tracking-widest uppercase text-architect-700">
          <Link href="/books" className="hover:text-primary transition-colors hover:-translate-y-0.5 transform duration-200">Books</Link>
          <Link href="/authors" className="hover:text-primary transition-colors hover:-translate-y-0.5 transform duration-200">Authors</Link>
          <Link href="/mission" className="hover:text-primary transition-colors hover:-translate-y-0.5 transform duration-200">Our Mission</Link>
          <Link href="/blog" className="hover:text-primary transition-colors hover:-translate-y-0.5 transform duration-200">Journal</Link>
        </div>

        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </nav>
  );
}
