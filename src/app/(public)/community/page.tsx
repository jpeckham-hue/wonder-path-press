import Link from 'next/link';
import { SchemaOrg } from '@/components/SchemaOrg';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Community Q&A | Wonderpath Press",
  description: "Read common questions from our community regarding our exclusive authors and books.",
};

export default async function CommunityPage() {
  const dbFaqs = await prisma.communityQA.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: 'desc' }
  });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dbFaqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answerHtml
      }
    }))
  };

  return (
    <div className="min-h-screen bg-[#fafafa] py-24 selection:bg-architect-accent selection:text-white">
      <SchemaOrg schema={faqSchema} />
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="mb-16 space-y-4">
          <span className="font-mono text-architect-500 uppercase tracking-[0.3em] text-xs font-semibold">Information Loop</span>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-architect-900 tracking-tight leading-[1.1]">
            Community <span className="italic font-light text-architect-500">&</span> Queries
          </h1>
          <p className="text-xl text-architect-700 leading-relaxed font-sans max-w-2xl">
            Insights drawn directly from our readers, curated to reveal the structural nuances and distinct processes behind Wonderpath Press publications.
          </p>
        </div>

        <div className="space-y-8">
          {dbFaqs.length === 0 ? (
             <div className="p-8 text-architect-500 font-mono text-center border-l-4 border-architect-900 bg-white">No active discussions found.</div>
          ) : dbFaqs.map(faq => (
            <blockquote key={faq.id} className="p-8 border-l-4 border-architect-900 bg-white shadow-sm">
              <h2 className="text-2xl font-serif font-bold text-architect-900 mb-4">{faq.question}</h2>
              <div 
                className="text-architect-700 leading-relaxed text-lg mb-4 font-sans prose prose-a:text-architect-accent hover:prose-a:text-architect-900 prose-a:font-bold" 
                dangerouslySetInnerHTML={{ __html: faq.answerHtml }} 
              />
              {faq.persona && (
                <p className="mt-4 text-xs font-mono uppercase tracking-widest text-architect-500">
                  &mdash; Answered by {faq.persona}
                </p>
              )}
            </blockquote>
          ))}
        </div>
      </div>
    </div>
  );
}