import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import {
  EditorContent,
  EditorProvider,
  RawCommands,
  useCurrentEditor,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import FontSize from "tiptap-extension-font-size";
import { Commands, Node } from "@tiptap/core";

import "./styles/editor.scss";
import { FaRedo, FaUndo } from "react-icons/fa";
import { useEffect } from "react";

const CustomFontSize = FontSize.extend({
  addCommands() {
    return {
      setFontSize:
        (fontSize: string) =>
        ({ chain }: { chain: any }) => {
          return chain().setMark("textStyle", { fontSize }).run();
        },
    };
  },
});

const CustomImage = Image.extend({
  addCommands() {
    return {
      setImage:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },
});

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result;
        editor
          .chain()
          .focus()
          .setImage({ src: base64 as string })
          .run();
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="control-group">
      <div className="button-group">
        <input
          type="color"
          onInput={(event) =>
            editor
              .chain()
              .focus()
              .setColor((event.target as HTMLInputElement).value)
              .run()
          }
          value={editor.getAttributes("textStyle").color || ""}
          data-testid="setColor"
        />
        <select
          onChange={(event) =>
            editor.chain().focus().setFontSize(event.target.value).run()
          }
          value={editor.getAttributes("textStyle").fontSize || ""}
        >
          <option value="14px">14</option>
          <option value="16px">16</option>
          <option value="18px">18</option>
          <option value="24px">24</option>
          <option value="32px">32</option>
          <option value="48px">48</option>
        </select>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          Bullet list
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          Ordered list
        </button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <FaUndo className="cursor-pointer" />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <FaRedo className="cursor-pointer" />
        </button>
        <button onClick={() => document.getElementById("file-upload")?.click()}>
          Upload Image
        </button>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileUpload}
        />
      </div>
    </div>
  );
};

const Doc = Node.create({
  name: "doc",
  topNode: true,
  content: "block+",
});
const extensions = [
  Doc,
  StarterKit.configure(),
  TextStyle,
  ListItem,
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  CustomImage.configure({
    inline: true,
    allowBase64: true,
  }),
  Placeholder.configure({
    placeholder: "Write something amazing...",
    showOnlyCurrent: true,
  }),
  CustomFontSize,
];

export function EditorTipTap({
  setEditorContent,
  Editcontent,
  bubble,
}: {
  setEditorContent: Function;
  Editcontent?: string;
  bubble?: string;
}) {
  // ✅ إنشاء المحرر مباشرةً
  const editor = useEditor({
    extensions,
    content: Editcontent || "",
    onUpdate: ({ editor }) => {
      setEditorContent(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && Editcontent && bubble) {
      editor.commands.setContent(Editcontent);
    }
  }, [editor, Editcontent, bubble]);

  const handlePaste = (event: any) => {
    if (!editor) return;
    const items = (event.clipboardData || event.originalEvent.clipboardData)
      .items;

    for (const item of items) {
      if (item.type.indexOf("image") !== -1) {
        const blob = item.getAsFile();
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64 = e.target?.result as string;
          editor.chain().focus().setImage({ src: base64 }).run();
        };
        reader.readAsDataURL(blob);
      }
    }
  };

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} onPaste={handlePaste} />
    </div>
  );
}
