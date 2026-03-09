import prisma from "@/lib/db";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const [totalBooks, totalAuthors] = await Promise.all([
    prisma.book.count(),
    prisma.author.count(),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-serif text-foreground">Dashboard</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Stats Cards */}
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-medium text-muted-foreground">Total Books</span>
            <span className="text-2xl font-bold">{totalBooks}</span>
          </div>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-medium text-muted-foreground">Registered Authors</span>
            <span className="text-2xl font-bold">{totalAuthors}</span>
          </div>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm opacity-50 relative group">
          <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-[1px] rounded-xl opacity-0 hover:opacity-100 transition-opacity">
            <span className="text-xs font-bold uppercase tracking-wider">Coming Soon</span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-medium text-muted-foreground">Blog Posts</span>
            <span className="text-2xl font-bold">0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
