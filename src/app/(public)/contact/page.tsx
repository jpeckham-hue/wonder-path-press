import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background py-24 md:py-32 flex items-center justify-center text-center">
      <div className="container px-6 max-w-2xl space-y-8">
        <h1 className="text-5xl md:text-7xl font-serif font-black text-primary">Contact Us</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          We are currently not accepting unsolicited manuscripts. Please check back later!
        </p>
        <div className="pt-8">
          <Link href="/" className="px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-accent transition-colors duration-300">
            Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}