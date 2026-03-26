import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createSession } from '@/lib/session';
import crypto from 'crypto';
import prisma from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    let isMatch = false;

    // Fallback logic for global env superadmin (for bootstrapping the first user)
    const expectedBuffer = Buffer.from(process.env.ADMIN_PASSWORD || '');
    if (password && expectedBuffer.length > 0) {
      const providedBuffer = Buffer.from(password);
      if (providedBuffer.length === expectedBuffer.length) {
         if (crypto.timingSafeEqual(providedBuffer, expectedBuffer)) {
           isMatch = true;
         }
      }
    }

    // Database verification if global password doesn't match
    if (!isMatch && email && password) {
      const user = await prisma.user.findUnique({ where: { email } });
      if (user) {
        isMatch = await bcrypt.compare(password, user.password);
      }
    }

    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const { session, expiresAt } = await createSession();
    const response = NextResponse.json({ success: true });
    
    response.cookies.set({
      name: 'admin_session',
      value: session,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: expiresAt,
      path: '/',
    });
    
    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
