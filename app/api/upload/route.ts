import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File | null;

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'audio/mpeg'];
  if (!validTypes.includes(file.type)) {
    return NextResponse.json({ error: 'Invalid file type. Only JPEG, PNG, WebP, GIF, SVG and MP3 allowed.' }, { status: 400 });
  }

  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json({ error: 'File too large. Max 10 MB.' }, { status: 400 });
  }

  const ext      = file.name.split('.').pop() ?? 'jpg';
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const bytes    = await file.arrayBuffer();
  const buffer   = Buffer.from(bytes);

  // Vercel Blob when token is present (production), local filesystem otherwise
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const { put } = await import('@vercel/blob');
    const blob = await put(`uploads/${filename}`, buffer, {
      access: 'public',
      contentType: file.type,
    });
    return NextResponse.json({ url: blob.url });
  }

  // Local dev: write to public/uploads/
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  await writeFile(path.join(uploadDir, filename), buffer);
  return NextResponse.json({ url: `/uploads/${filename}` });
}
