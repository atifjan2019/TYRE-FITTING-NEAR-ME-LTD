import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { auth } from "@/auth";

/**
 * Authenticated image upload → Vercel Blob. Returns the public URL, which the
 * admin stores against the relevant field. On Vercel the token is injected
 * automatically; locally set BLOB_READ_WRITE_TOKEN in .env.local.
 */
export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      {
        error:
          "Image uploads aren't configured. Add a Vercel Blob store and set BLOB_READ_WRITE_TOKEN.",
      },
      { status: 501 }
    );
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  // Basic guardrails.
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Only image files are allowed" }, { status: 415 });
  }
  if (file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ error: "Image must be under 8MB" }, { status: 413 });
  }

  try {
    const blob = await put(`uploads/${file.name}`, file, {
      access: "public",
      addRandomSuffix: true,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    return NextResponse.json({ url: blob.url });
  } catch (err) {
    console.error("Blob upload failed:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 502 });
  }
}
