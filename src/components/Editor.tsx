import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";

function EditorComponent({ editorRef }) {
  return (
    <Editor
      apiKey="8hzh17j6eoodofhqd7f3b2du9qxe38197mzevue64afcx5jp"
      onInit={(_evt, editor) => (editorRef.current = editor)}
      init={{
        height: "calc(100vh - 75px)",
        // width: 403,
        image_caption: true,
        plugins: [
          "advlist",
          "autolink",
          "link",
          "image",
          "lists",
          "charmap",
          "preview",
          "anchor",
          "pagebreak",
          "searchreplace",
          "wordcount",
          "visualblocks",
          "visualchars",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "emoticons",
        ],
        toolbar:
          "undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | " +
          "bullist numlist outdent indent | link image | print preview media fullscreen | " +
          "forecolor backcolor emoticons | help",
        mobile: {
          menubar: true,
          plugins: "autosave lists autolink",
          toolbar: "undo bold italic styles",
        },
      }}
    />
  );
}

export default EditorComponent;
