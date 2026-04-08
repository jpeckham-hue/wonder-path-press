import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import type { Book, Author } from "@prisma/client";

type BookWithAuthor = Book & { author?: Author };

export function BookCard({ book }: { book: BookWithAuthor }) {
  return (
    <div className={"group flex flex-col bg-card rounded-3xl overflow-hidden border-2 border-transparent hover:border-secondary hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300"}>
      <div className={"relative aspect-[3/4] bg-muted overflow-hidden"}>
        {book.tag && (
          <span className={"absolute top-4 left-4 z-10 px-3 py-1 bg-secondary text-secondary-foreground text-xs font-bold uppercase tracking-wider rounded-full shadow-sm"}>
            {book.tag}
          </span>
        )}
        <Image
          src={book.image}
          alt={"Cover of " + book.title}
          fill
          sizes={"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
          className={"object-cover transition-transform duration-500 group-hover:scale-105"}
        />
      </div>

      <div className={"flex flex-col flex-1 p-6 space-y-4"}>
        <div className={"space-y-1"}>
          <Link href={"/books/" + book.id} className={"block"}>
            <h3 className={"font-serif text-2xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors"}>
              {book.title}
            </h3>
          </Link>
          <p className={"text-sm font-medium text-muted-foreground"}>
            By {book.author ? book.author.name : "Unknown Author"}
          </p>
        </div>
        
        <p className={"text-muted-foreground text-sm line-clamp-3"}>
          {book.description}
        </p>

        <div className={"mt-auto pt-4 flex items-center justify-between gap-4"}>
          <span className={"font-bold text-xl text-primary"}>${book.price.toFixed(2)}</span>
          <a 
            href={book.amazonLink}
            target={"_blank"}
            rel={"noopener noreferrer"}
            aria-label={"Buy " + book.title + " on Amazon"}
            className={"flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-accent text-accent-foreground font-bold rounded-xl hover:bg-accent/90 transition-colors shadow-sm hover:translate-y-[-1px]"}
          >
            <ShoppingCart size={18} />
            Buy Now
          </a>
        </div>
      </div>
    </div>
  );
}
