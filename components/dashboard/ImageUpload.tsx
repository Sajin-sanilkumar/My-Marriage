'use client';

import { useRef, useState } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  hint?: string;
  placeholder?: string;
}

export function ImageUpload({ value, onChange, hint, placeholder = 'https://...' }: ImageUploadProps) {
  const inputRef   = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError]         = useState<string | null>(null);

  async function handleFile(file: File) {
    setUploading(true);
    setError(null);
    try {
      const form = new FormData();
      form.append('file', file);
      const res  = await fetch('/api/upload', { method: 'POST', body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Upload failed');
      onChange(data.url);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  return (
    <div className="space-y-2">
      {/* Preview */}
      {value && (
        <div className="relative inline-block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Preview"
            className="h-24 w-auto rounded-md border border-zinc-200 object-cover"
          />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 text-white hover:bg-red-600 transition-colors"
            aria-label="Remove image"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      )}

      {/* URL input + upload button row */}
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 font-mono text-xs"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="shrink-0"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          {uploading
            ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
            : <Upload className="h-3.5 w-3.5" />}
          {uploading ? 'Uploading…' : 'Upload'}
        </Button>
      </div>

      {/* Drag-and-drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="flex items-center justify-center rounded-md border border-dashed border-zinc-300 bg-zinc-50 py-4 text-xs text-zinc-400 cursor-pointer hover:border-zinc-400 transition-colors"
        onClick={() => inputRef.current?.click()}
      >
        {uploading
          ? <Loader2 className="h-4 w-4 animate-spin mr-2" />
          : <Upload className="h-4 w-4 mr-2" />}
        {uploading ? 'Uploading…' : 'Drag & drop or click to upload'}
      </div>

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = '';
        }}
      />

      {hint && !error && <p className="text-[11px] text-zinc-400">{hint}</p>}
      {error && <p className="text-[11px] text-red-500">{error}</p>}
    </div>
  );
}
