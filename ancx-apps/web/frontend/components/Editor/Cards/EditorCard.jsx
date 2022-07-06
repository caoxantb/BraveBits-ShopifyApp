import { Card, FormLayout, TextField, TextStyle } from "@shopify/polaris";
import { Editor } from "@tinymce/tinymce-react";

const EditorCard = (props) => {
  const { page, handleTitleChange, handleEditorChange, handleEditorOnInit } =
    props;
  return (
    <Card sectioned>
      <FormLayout>
        <TextField
          label="Title"
          placeholder="e.g. Contact us, Sizing chart, FAQs"
          value={page.title}
          onChange={handleTitleChange}
          autoComplete="off"
        />
        <TextStyle style={{ color: "black" }}>Content</TextStyle>
        <Editor
          value={page.content}
          onEditorChange={handleEditorChange}
          onInit={handleEditorOnInit}
          init={{
            height: 150,
            menubar: false,
            plugins: ["image", "code", "table", "link", "media", "codesample"],
            toolbar:
              "blocks | " +
              "bold italic underline | backcolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent |" +
              "code",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
      </FormLayout>
    </Card>
  );
};

export default EditorCard;
