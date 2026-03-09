import Image from "next/image";
import Link from "next/link";

const AUTHORS = [
  {
    id: 1,
    name: "Elena Vance",
    role: "Fiction & Fantasy",
    bio: "Elena serves as the lead architect of worlds unknown. Her stories weave magic with the mundane.",
    image: "/author-placeholder.png",
  },
  {
    id: 2,
    name: "Marcus Thorne",
    role: "Historical Non-Fiction",
    bio: "Marcus unearths the buried secrets of the past, bringing history to life with vivid detail.",
    image: "/author-placeholder.png",
  },
  {
    id: 3,
    name: "Sarah Jenkins",
    role: "Modern Poetry",
    bio: "Sarah captures the fleeting moments of modern life in her poignant and accessible verse.",
    image: "/author-placeholder.png",
  },
  {
    id: 4,
    name: "Dr. Aris Vane",
    role: "Science & Philosophy",
    bio: "Bridging the gap between empirical data and human experience, Dr. Vane challenges how we think.",
    image: "/author-placeholder.png",
  },
];

export default function AuthorsPage() {
  return (
    <div className="min-h-screen bg-background py-16 md:py-24">
      <div className="container px-4">
        <div className="max-w-2xl mx-auto text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-foreground">Our Authors</h1>
          <p className="text-lg text-muted-foreground">
            Meet the voices behind the stories. We curate diverse perspectives from around the globe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {AUTHORS.map((author) => (
            <div key={author.id} className="group flex flex-col items-center text-center space-y-4">
              <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-muted group-hover:border-accent transition-colors duration-300">
                <Image
                  src={author.image}
                  alt={author.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-2xl font-bold text-foreground">{author.name}</h3>
                <p className="text-sm font-medium text-accent uppercase tracking-wider">{author.role}</p>
                <p className="text-muted-foreground text-sm leading-relaxed px-2">
                  {author.bio}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 rounded-2xl bg-muted/30 p-8 md:p-12 text-center space-y-6">
          <h2 className="text-3xl font-serif font-bold">Join Our Family</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            We are always looking for new voices. If you have a story that wanders off the beaten path, we want to hear it.
          </p>
          <Link 
            href="/contact" 
            className="inline-block px-8 py-3 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition-colors"
          >
            Submit a Manuscript
          </Link>
        </div>
      </div>
    </div>
  );
}
