import React from 'react';

export function AEOBlock({ title, summary }: { title: string; summary?: string | null }) {
  if (!summary) return null;
  return (
    <blockquote id="aeo-summary-book" className="mb-12 p-8 border-l-4 border-primary bg-primary/5 rounded-r-2xl shadow-sm">
      <h2 className="text-2xl font-serif text-primary font-bold mb-3">What is {title} about?</h2>
      <p className="text-foreground/80 leading-relaxed font-medium">{summary}</p>
    </blockquote>
  );
}