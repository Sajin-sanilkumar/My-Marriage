import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  const contentType = request.headers.get('content-type') || '';
  let username: string | null = null;
  let password: string | null = null;

  if (contentType.includes('application/json')) {
    const body = await request.json();
    username = body.username;
    password = body.password;
  } else {
    const formData = await request.formData();
    username = formData.get('username')?.toString() ?? null;
    password = formData.get('password')?.toString() ?? null;
  }

  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    return NextResponse.redirect(new URL('/login?error=server', request.url), 303);
  }

  if (username === adminUsername && password === adminPassword) {
    const token = jwt.sign({ username }, jwtSecret, { expiresIn: '7d' });
    const response = NextResponse.redirect(new URL('/admin', request.url), 303);
    response.cookies.set('auth', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  }

  return NextResponse.redirect(new URL('/login?error=invalid', request.url), 303);
}
