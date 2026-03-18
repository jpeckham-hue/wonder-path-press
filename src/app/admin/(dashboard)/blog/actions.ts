"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifySession } from "@/lib/session";

async function checkAuth() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('admin_session')?.value;
  const session = await verifySession(sessionCookie);
  if (!session) {
    throw new Error("Unauthorized");
  }
}

export async function createPost(formData: FormData) {
  await checkAuth();
  
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const content = formData.get("content") as string;
  const excerpt = formData.get("excerpt") as string;
  const coverImage = formData.get("coverImage") as string;
  const authorId = formData.get("authorId") as string;
  const published = formData.get("published") === "on";

  if (!title || !slug || !content || !authorId) {
    throw new Error("Missing required fields");
  }

  await prisma.post.create({
    data: {
      title,
      slug,
      content,
      excerpt: excerpt || null,
      coverImage: coverImage || null,
      authorId,
      published,
    },
  });

  revalidatePath("/admin/blog");
  revalidatePath("/admin/dashboard");
  redirect("/admin/blog");
}

export async function updatePost(id: string, formData: FormData) {
  await checkAuth();

  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const content = formData.get("content") as string;
  const excerpt = formData.get("excerpt") as string;
  const coverImage = formData.get("coverImage") as string;
  const authorId = formData.get("authorId") as string;
  const published = formData.get("published") === "on";

  if (!title || !slug || !content || !authorId) {
    throw new Error("Missing required fields");
  }

  await prisma.post.update({
    where: { id },
    data: {
      title,
      slug,
      content,
      excerpt: excerpt || null,
      coverImage: coverImage || null,
      authorId,
      published,
    },
  });

  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

export async function deletePost(id: string) {
  await checkAuth();
  await prisma.post.delete({ where: { id } });
  revalidatePath("/admin/blog");
  revalidatePath("/admin/dashboard");
}
