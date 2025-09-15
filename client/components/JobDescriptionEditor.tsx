// JobDescriptionEditor.tsx
import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Placeholder from "@tiptap/extension-placeholder";

import "./JobDescriptionEditor.css";

interface JobDescriptionEditorProps {
  placeholder: string;
}

export default function JobDescriptionEditor({ placeholder }: JobDescriptionEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link,
      Image,
      TextStyle,
      Color,
      ListItem,
      BulletList,
      OrderedList,
      Placeholder.configure({ placeholder }),
    ],
    content: "",
  });

  if (!editor) return null;

  const addLink = () => {
    const url = window.prompt("Nhập link:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const addImage = () => {
    const url = window.prompt("Nhập link ảnh:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="editor-container">
      <div className="toolbar">
        <button onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "active" : ""}>
          B
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "active" : ""}>
          I
        </button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "active" : ""}>
          U
        </button>

        <input
          type="color"
          onInput={(e) =>
            editor.chain().focus().setColor((e.target as HTMLInputElement).value).run()
          }
          value={editor.getAttributes("textStyle").color || "#000000"}
        />

        <button onClick={() => editor.chain().focus().setTextAlign("left").run()}>⯇</button>
        <button onClick={() => editor.chain().focus().setTextAlign("center").run()}>≡</button>
        <button onClick={() => editor.chain().focus().setTextAlign("right").run()}>⯈</button>
        <button onClick={() => editor.chain().focus().setTextAlign("justify").run()}>☰</button>

        <button onClick={() => editor.chain().focus().toggleBulletList().run()}>• List</button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>1. List</button>

        <button onClick={addLink}>🔗</button>
        <button onClick={() => editor.chain().focus().unsetLink().run()}>❌🔗</button>

        <button onClick={addImage}>🖼</button>

        <button onClick={() => editor.chain().focus().undo().run()}>↩️</button>
        <button onClick={() => editor.chain().focus().redo().run()}>↪️</button>
      </div>

      <EditorContent editor={editor} className="editor-content" />
    </div>
  );
}
