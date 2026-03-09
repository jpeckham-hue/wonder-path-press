import Link from "next/link";
import { MobileNav } from "./ui/MobileNav";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-primary">
          Wonder Path Press
        </Link>
        <div className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <Link href="/books" className="hover:text-foreground transition-colors">Books</Link>
          <Link href="/authors" className="hover:text-foreground transition-colors">Authors</Link>
          <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
        </div>
        <MobileNav />
      </div>
    </nav>
  );
}
