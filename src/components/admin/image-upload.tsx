"use client";

import { useState, useRef } from "react";
import { Upload, Loader2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

/**
 * Image field for the admin. Uploads to /api/upload (Vercel Blob) and stores
 * the resulting public URL in a hidden input so it submits with the form.
 * Also accepts a pasted URL for images hosted elsewhere.
 */
export function ImageUpload({
  name,
  defaultValue,
}: {
  name: string;
  defaultValue?: string | null;
}) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setUploading(true);
    setError(null);
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setUrl(data.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      {/* The actual value submitted with the form */}
      <input type="hidden" name={name} value={url} />

      {url ? (
        <div className="mb-3 flex items-start gap-3">
          {/* Plain <img> is fine in the admin (not perf-critical). */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={url}
            alt="Preview"
            className="h-20 w-20 rounded-md border object-cover"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setUrl("")}
          >
            <X className="h-4 w-4" /> Remove
          </Button>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Uploading…
            </>
          ) : (
            <>
              <Upload className="h-4 w-4" /> Upload image
            </>
          )}
        </Button>
        <span className="text-xs text-muted-foreground">or paste a URL:</span>
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://…"
          className="h-9 max-w-xs"
        />
      </div>

      {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
    </div>
  );
}
