"use client";

import { useState, useRef } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import {
  Bold,
  Italic,
  Strikethrough,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Minus,
  Link as LinkIcon,
  Image as ImageIcon,
  Undo,
  Redo,
  Code2,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Tiptap rich-text editor for admin body fields. Outputs HTML into a hidden
 * input (`name`) so it submits with the surrounding form. Images are uploaded
 * to Vercel Blob via /api/upload and inserted inline.
 *
 * An "HTML" toggle switches the body area to a raw-HTML textarea, so whole
 * articles can be pasted in as markup (e.g. from another CMS) and hand-edited.
 * The hidden input always carries the current HTML, so the form submits
 * correctly in either mode.
 */
export function RichTextEditor({
  name,
  defaultValue,
}: {
  name: string;
  defaultValue?: string;
}) {
  const [html, setHtml] = useState(defaultValue ?? "");
  const [showSource, setShowSource] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    immediatelyRender: false, // avoids SSR hydration mismatch in Next.js
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false, HTMLAttributes: { rel: "noopener" } }),
      Image,
    ],
    content: defaultValue ?? "",
    editorProps: {
      attributes: {
        class:
          "prose-content min-h-48 max-w-none rounded-b-md border border-t-0 border-input bg-background px-3 py-2 focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => setHtml(editor.getHTML()),
  });

  async function uploadAndInsert(file: File) {
    const body = new FormData();
    body.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body });
    const data = await res.json();
    if (res.ok && editor) {
      editor.chain().focus().setImage({ src: data.url }).run();
    } else {
      alert(data.error || "Image upload failed");
    }
  }

  /** Toggle between the visual editor and the raw-HTML textarea. */
  function toggleSource() {
    if (showSource) {
      // Coming back to the visual editor: push the edited HTML into Tiptap.
      editor?.commands.setContent(html);
    }
    setShowSource((s) => !s);
  }

  if (!editor) {
    return (
      <div className="min-h-48 rounded-md border border-input bg-background" />
    );
  }

  return (
    <div>
      <input type="hidden" name={name} value={html} />

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 rounded-t-md border border-input bg-secondary/40 p-1.5">
        {showSource ? (
          <span className="px-2 text-xs font-medium text-muted-foreground">
            Editing raw HTML — switch back to format visually.
          </span>
        ) : (
          <>
            <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Bold">
              <Bold className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Italic">
              <Italic className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} title="Strikethrough">
              <Strikethrough className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive("code")} title="Inline code">
              <Code className="h-4 w-4" />
            </ToolbarButton>
            <Divider />
            <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} title="Heading 2">
              <Heading2 className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} title="Heading 3">
              <Heading3 className="h-4 w-4" />
            </ToolbarButton>
            <Divider />
            <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Bullet list">
              <List className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Numbered list">
              <ListOrdered className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} title="Quote">
              <Quote className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Divider line">
              <Minus className="h-4 w-4" />
            </ToolbarButton>
            <Divider />
            <ToolbarButton onClick={() => setLink(editor)} active={editor.isActive("link")} title="Add link">
              <LinkIcon className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton onClick={() => fileRef.current?.click()} title="Insert image">
              <ImageIcon className="h-4 w-4" />
            </ToolbarButton>
            <Divider />
            <ToolbarButton onClick={() => editor.chain().focus().undo().run()} title="Undo">
              <Undo className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().redo().run()} title="Redo">
              <Redo className="h-4 w-4" />
            </ToolbarButton>
          </>
        )}

        {/* HTML source toggle, always available, pushed to the right. */}
        <span className="ml-auto" />
        <ToolbarButton onClick={toggleSource} active={showSource} title="Edit HTML source">
          <Code2 className="h-4 w-4" />
        </ToolbarButton>
      </div>

      {showSource ? (
        <textarea
          value={html}
          onChange={(e) => setHtml(e.target.value)}
          spellCheck={false}
          className="min-h-48 w-full max-w-none rounded-b-md border border-t-0 border-input bg-background px-3 py-2 font-mono text-sm focus:outline-none"
          rows={18}
          placeholder="<p>Paste or write HTML here…</p>"
        />
      ) : (
        <EditorContent editor={editor} />
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) uploadAndInsert(f);
        }}
      />
    </div>
  );
}

function setLink(editor: Editor) {
  const previous = editor.getAttributes("link").href as string | undefined;
  const url = window.prompt("Link URL", previous ?? "https://");
  if (url === null) return; // cancelled
  if (url === "") {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    return;
  }
  editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
}

function ToolbarButton({
  onClick,
  active,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={cn(
        "grid h-8 w-8 place-items-center rounded hover:bg-background",
        active && "bg-background text-primary shadow-sm"
      )}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <span className="mx-1 h-5 w-px bg-border" />;
}
