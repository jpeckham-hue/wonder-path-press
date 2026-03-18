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

export async function createBook(formData: FormData) {
  await checkAuth();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const image = formData.get("image") as string;
  const amazonLink = formData.get("amazonLink") as string;
  const tag = formData.get("tag") as string;
  const authorId = formData.get("authorId") as string;

  if (!title || !description || isNaN(price) || !image || !amazonLink || !authorId) {
    throw new Error("Missing required fields");
  }

  await prisma.book.create({
    data: {
      title,
      description,
      price,
      image,
      amazonLink,
      tag: tag || null,
      authorId,
    },
  });

  revalidatePath("/admin/books");
  redirect("/admin/books");
}

export async function updateBook(id: string, formData: FormData) {
  await checkAuth();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const image = formData.get("image") as string;
  const amazonLink = formData.get("amazonLink") as string;
  const tag = formData.get("tag") as string;
  const authorId = formData.get("authorId") as string;

  if (!title || !description || isNaN(price) || !image || !amazonLink || !authorId) {
    throw new Error("Missing required fields");
  }

  await prisma.book.update({
    where: { id },
    data: {
      title,
      description,
      price,
      image,
      amazonLink,
      tag: tag || null,
      authorId,
    },
  });

  revalidatePath("/admin/books");
  redirect("/admin/books");
}

export async function deleteBook(id: string) {
  await checkAuth();
  await prisma.book.delete({ where: { id } });
  revalidatePath("/admin/books");
}
