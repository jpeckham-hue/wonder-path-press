"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="md:hidden">
      <button 
        onClick={toggle} 
        aria-label="Toggle Menu"
        className="p-2 text-foreground hover:bg-muted rounded-md transition-colors"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 z-50 bg-background border-b shadow-lg p-4 flex flex-col gap-4">
          <Link href="/" onClick={toggle} className="px-4 py-2 hover:bg-muted rounded-md font-medium">Home</Link>
          <Link href="/books" onClick={toggle} className="px-4 py-2 hover:bg-muted rounded-md font-medium">Books</Link>
          <Link href="/authors" onClick={toggle} className="px-4 py-2 hover:bg-muted rounded-md font-medium">Authors</Link>
          <Link href="/blog" onClick={toggle} className="px-4 py-2 hover:bg-muted rounded-md font-medium">Blog</Link>
        </div>
      )}
    </div>
  );
}
