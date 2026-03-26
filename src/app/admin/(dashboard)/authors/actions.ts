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
    throw new Error("UNAUTHORIZED_SESSION_EXPIRED");
  }
}

export async function createAuthor(formData: FormData) {
  try {
    await checkAuth();
  } catch (err) {
    throw new Error("Your session has expired. Please refresh the page and log in again.");
  }

  const name = formData.get("name") as string;
  const bio = formData.get("bio") as string;
  const avatarUrl = formData.get("avatarUrl") as string;

  if (!name) throw new Error("Name is required");

  // Log to see how big it is
  console.log("Avatar URL length:", avatarUrl?.length);

  try {
    await prisma.author.create({
      data: { name, bio: bio || null, avatarUrl: avatarUrl || null },
    });
  } catch (err: any) {
    console.error("Prisma error:", err);
    throw new Error("Database failed to save the author. " + (err.message || String(err)));
  }

  revalidatePath("/admin/authors");
  redirect("/admin/authors");
}

export async function updateAuthor(id: string, formData: FormData) {
  try {
    await checkAuth();
  } catch (err) {
    throw new Error("Your session has expired. Please refresh the page and log in again.");
  }
  
  const name = formData.get("name") as string;
  const bio = formData.get("bio") as string;
  const avatarUrl = formData.get("avatarUrl") as string;

  if (!name) throw new Error("Name is required");

  try {
    await prisma.author.update({
      where: { id },
      data: { name, bio: bio || null, avatarUrl: avatarUrl || null },
    });
  } catch (err: any) {
    console.error("Prisma error:", err);
    throw new Error("Database failed to update the author.");
  }

  revalidatePath("/admin/authors");
  redirect("/admin/authors");
}

export async function deleteAuthor(id: string) {
  await checkAuth();
  await prisma.author.delete({ where: { id } });
  revalidatePath("/admin/authors");
}
