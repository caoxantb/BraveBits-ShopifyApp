import { Card, FormLayout, TextField, TextStyle } from "@shopify/polaris";
import { Editor } from "@tinymce/tinymce-react";

import { IPage } from "../../../interfaces/IPage";

interface EditorCardProps {
  page: IPage;
  handleTitleChange: (value: string) => void;
  handleEditorChange: (value: string, editor: any) => void;
  handleEditorOnInit: (event: any, editor: any) => void;
}

const EditorCard: React.FC<EditorCardProps> = (props) => {
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
        <TextStyle>
          <span style={{ color: "black" }}>Content</span>
        </TextStyle>
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
