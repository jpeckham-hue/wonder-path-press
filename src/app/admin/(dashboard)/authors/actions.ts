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

export async function createAuthor(formData: FormData) {
  await checkAuth();
  const name = formData.get("name") as string;
  const bio = formData.get("bio") as string;
  const avatarUrl = formData.get("avatarUrl") as string;

  if (!name) throw new Error("Name is required");

  await prisma.author.create({
    data: { name, bio: bio || null, avatarUrl: avatarUrl || null },
  });

  revalidatePath("/admin/authors");
  redirect("/admin/authors");
}

export async function updateAuthor(id: string, formData: FormData) {
  await checkAuth();
  const name = formData.get("name") as string;
  const bio = formData.get("bio") as string;
  const avatarUrl = formData.get("avatarUrl") as string;

  if (!name) throw new Error("Name is required");

  await prisma.author.update({
    where: { id },
    data: { name, bio: bio || null, avatarUrl: avatarUrl || null },
  });

  revalidatePath("/admin/authors");
  redirect("/admin/authors");
}

export async function deleteAuthor(id: string) {
  await checkAuth();
  await prisma.author.delete({ where: { id } });
  revalidatePath("/admin/authors");
}
