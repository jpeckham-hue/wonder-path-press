import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import PostForm from "@/components/admin/PostForm";

export const dynamic = 'force-dynamic';

export default async function EditPostPage({ params }: { params: { id: string } }) {
  // @ts-ignore
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });
  
  if (!post) {
    notFound();
  }

  const authors = await prisma.author.findMany({ select: { id: true, name: true } });

  return (
    <div className="space-y-6">
      <PostForm post={post as any} authors={authors} />
    </div>
  );
}
