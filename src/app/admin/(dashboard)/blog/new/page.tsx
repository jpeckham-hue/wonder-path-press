import prisma from "@/lib/db";
import PostForm from "@/components/admin/PostForm";

export const dynamic = 'force-dynamic';

export default async function NewPostPage() {
  const authors = await prisma.author.findMany({ select: { id: true, name: true } });

  return (
    <div className="space-y-6">
      <PostForm authors={authors} />
    </div>
  );
}
