'use client';

import { useRef, useState } from 'react';
import { Upload, X, Loader2, Music, Headphones } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface AudioUploadProps {
  value: string;
  onChange: (url: string) => void;
  hint?: string;
  placeholder?: string;
}

export function AudioUpload({ value, onChange, hint, placeholder = 'https://...' }: AudioUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    if (file.type !== 'audio/mpeg') {
      setError('Only MP3 files are allowed.');
      return;
    }

    setUploading(true);
    setError(null);
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: form });
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
      {/* Audio Player Preview */}
      {value && (
        <div className="flex items-center gap-4 p-3 rounded-lg border border-zinc-200 bg-zinc-50/50">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-white">
            <Music className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-zinc-900 truncate">Background Music</p>
            <audio src={value} controls className="h-8 w-full mt-1" />
          </div>
          <button
            type="button"
            onClick={() => onChange('')}
            className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 hover:bg-red-50 hover:text-red-600 transition-colors"
            aria-label="Remove audio"
          >
            <X className="h-4 w-4" />
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
        className="flex items-center justify-center rounded-md border border-dashed border-zinc-300 bg-zinc-50 py-6 text-xs text-zinc-400 cursor-pointer hover:border-zinc-400 transition-colors"
        onClick={() => inputRef.current?.click()}
      >
        {uploading
          ? <Loader2 className="h-5 w-5 animate-spin mr-2" />
          : <Headphones className="h-5 w-5 mr-2" />}
        <div className="text-center">
          <p className="font-medium text-zinc-600">{uploading ? 'Uploading audio...' : 'Drag & drop MP3 file'}</p>
          <p className="mt-0.5 text-zinc-400">or click to browse</p>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="audio/mpeg"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = '';
        }}
      />

      {hint && !error && <p className="text-[11px] text-zinc-400">{hint}</p>}
      {error && <p className="text-[11px] text-red-500 font-medium">{error}</p>}
    </div>
  );
}
