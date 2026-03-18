import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createSession } from '@/lib/session';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    const providedBuffer = Buffer.from(password || '');
    const expectedBuffer = Buffer.from(process.env.ADMIN_PASSWORD || '');
    
    let isMatch = false;
    if (providedBuffer.length === expectedBuffer.length) {
      isMatch = crypto.timingSafeEqual(providedBuffer, expectedBuffer);
    }

    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
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
