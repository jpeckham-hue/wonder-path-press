"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifySession } from "@/lib/session";
import bcrypt from "bcryptjs";

async function checkAuth() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('admin_session')?.value;
  const session = await verifySession(sessionCookie);
  if (!session) throw new Error("Unauthorized");
}

export async function createUser(formData: FormData) {
  await checkAuth();
  const email = formData.get("email") as string;
  const name = formData.get("name") as string;
  const password = formData.get("password") as string;

  if (!email || !password) throw new Error("Email and password required");

  const hashedPassword = bcrypt.hashSync(password, 10);

  await prisma.user.create({
    data: { email, name: name || null, password: hashedPassword }
  });

  revalidatePath("/admin/users");
  redirect("/admin/users");
}

export async function deleteUser(id: string) {
  await checkAuth();
  if (!id) return;
  
  // Basic protection so you don't delete the last user
  const count = await prisma.user.count();
  if (count <= 1) throw new Error("Cannot delete the last admin user");

  await prisma.user.delete({ where: { id } });
  revalidatePath("/admin/users");
}
