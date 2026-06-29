import { CKEditor } from "@ckeditor/ckeditor5-react";
// @ts-ignore
import { Editor as ClassicEditor } from "@/lib/ckeditor5/build/ckeditor";

export default function CkEditorComponent({
  setContent,
  content,
  lang = "en",
  placeholder = "",
}: {
  setContent: (value: string) => void;
  content: string;
  lang?: "en" | "ar";
  placeholder?: string;
}) {
  return (
    <CKEditor
      editor={ClassicEditor}
      config={{
        language: lang,
        placeholder,
        fontSize: {
          options: [
            "8px",
            "10px",
            "12px",
            "14px",
            "16px",
            "18px",
            "20px",
            "24px",
            "28px",
            "32px",
            "36px",
            "40px",
            "50px",
            "55px",
          ],
          supportAllValues: false,
        },
        // lineHeight: {
        //   options: ["1", "1.15", "1.5", "2", "2.5", "3"],
        // },
        style: {
          definitions: [
            {
              name: "Light",
              element: "span",
              classes: ["font-weight-light"],
            },
            {
              name: "Normal",
              element: "span",
              classes: ["font-weight-normal"],
            },
            {
              name: "Medium",
              element: "span",
              classes: ["font-weight-medium"],
            },
            {
              name: "Bold",
              element: "span",
              classes: ["font-weight-bold"],
            },
            {
              name: "Extra Bold",
              element: "span",
              classes: ["font-weight-extrabold"],
            },

            // Line heights
            { name: "Line Height: 1", element: "p", classes: ["lh-1"] },
            { name: "Line Height: 1.5", element: "p", classes: ["lh-1_5"] },
            { name: "Line Height: 2", element: "p", classes: ["lh-2"] },
            { name: "Line Height: 2.5", element: "p", classes: ["lh-2_5"] },
            { name: "Line Height: 3", element: "p", classes: ["lh-3"] },

            // Line Height Styles for h1
            { name: "H1 (LH) 1", element: "h1", classes: ["lh-1"] },
            { name: "H1 (LH) 1.5", element: "h1", classes: ["lh-1_5"] },
            { name: "H1 (LH) 1.7", element: "h1", classes: ["lh-1_7"] },
            { name: "H1 (LH) 2", element: "h1", classes: ["lh-2"] },

            // (LH) Styles for h2
            { name: "H2 (LH) 1", element: "h2", classes: ["lh-1"] },
            { name: "H2 (LH) 1.5", element: "h2", classes: ["lh-1_5"] },
            { name: "H2 (LH) 1.7", element: "h2", classes: ["lh-1_7"] },
            { name: "H2 (LH) 2", element: "h2", classes: ["lh-2"] },

            // (LH) Styles for h3
            { name: "H3 (LH) 1", element: "h3", classes: ["lh-1"] },
            { name: "H3 (LH) 1.5", element: "h3", classes: ["lh-1_5"] },
            { name: "H3 (LH) 1.7", element: "h3", classes: ["lh-1_7"] },
            { name: "H3 (LH) 2", element: "h3", classes: ["lh-2"] },
          ],
        },
        heading: {
          options: [
            {
              model: "paragraph",
              title: "Paragraph",
              class: "ck-heading_paragraph",
            },
            {
              model: "heading1",
              view: "h1",
              title: "Heading 1",
              class: "ck-heading_heading1",
            },
            {
              model: "heading2",
              view: "h2",
              title: "Heading 2",
              class: "ck-heading_heading2",
            },
            {
              model: "heading3",
              view: "h3",
              title: "Heading 3",
              class: "ck-heading_heading3",
            },
            {
              model: "heading4",
              view: "h4",
              title: "Heading 4",
              class: "ck-heading_heading4",
            },
            // Add more if needed
          ],
        },
        toolbar: {
          items: [
            "undo",
            "redo",
            "|",
            "imageInsert",
            "|",
            "heading",
            "bold",
            "italic",
            "strikethrough",
            "underline",
            "link",
            "blockQuote",
            "removeFormat",
            "|",
            "selectAll",
            "specialCharacters",
            "superscript",
            "subscript",
            "style", // ✅ For font-weight
            "|",
            "bulletedList",
            "numberedList",
            "outdent",
            "indent",
            "|",
            "mediaEmbed",
            "insertTable",
            "|",
            "fontColor",
            "fontBackgroundColor",
            "fontSize",
            "highlight",
            // "lineHeight",
            "|",
            "horizontalLine",
            "pageBreak",
            "findAndReplace",
            "restrictedEditingException",
          ],
          shouldNotGroupWhenFull: true,
        },
        image: {
          toolbar: [
            "imageTextAlternative",
            "toggleImageCaption",
            "imageStyle:inline",
            "imageStyle:block",
            "imageStyle:side",
          ],
        },
        table: {
          contentToolbar: [
            "tableColumn",
            "tableRow",
            "mergeTableCells",
            "tableCellProperties",
            "tableProperties",
          ],
        },
      }}
      data={content}
      onReady={(editor: any) => {
        editor.editing.view.change((writer: any) => {
          writer.setStyle(
            "height",
            "500px",
            editor.editing.view.document.getRoot(),
          );
          writer.setAttribute(
            "dir",
            lang === "ar" ? "rtl" : "ltr",
            editor.editing.view.document.getRoot(),
          );
        });
      }}
      onChange={(_, editor) => {
        setContent(editor.getData());
      }}
    />
  );
}
