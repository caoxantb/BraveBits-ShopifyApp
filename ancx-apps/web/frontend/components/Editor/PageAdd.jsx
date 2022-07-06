import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { useAppBridge } from "@shopify/app-bridge-react";

import { Page, Layout, PageActions, Frame, Loading } from "@shopify/polaris";
import VisibilityCard from "./Cards/VisibilityCard";
import OnlineStoreCard from "./Cards/OnlineStoreCard";
import SearchEngineCard from "./Cards/SearchEngineCard";
import EditorCard from "./Cards/EditorCard";
import SaveBar from "./SaveBar";
import ModalDiscard from "./Modals/ModalDiscard";
import ModalCancel from "./Modals/ModalCancel";

import pageService from "../../services/pageService";

import { useRecoilState } from "recoil";
import discardAtom from "../../store/discardAtom";
import cancelAtom from "../../store/cancelAtom";

const PageAdd = () => {
  const app = useAppBridge();
  const navigate = useNavigate();

  const [page, setPage] = useState({
    title: "",
    content: "",
  });
  const [visibilitySelected, setVisibilitySelected] = useState(["Visible"]);
  const [select, setSelect] = useState("Default Page");
  const [text, setText] = useState("");
  const [discardActive, setDiscardActive] = useRecoilState(discardAtom);
  const [cancelActive, setCancelActive] = useRecoilState(cancelAtom);
  const [isSaving, setIsSaving] = useState(false);

  const handleTitleChange = (value) => {
    setPage({ ...page, title: value });
  };
  const handleEditorChange = (value, editor) => {
    setPage({ ...page, content: value });
    setText(editor.getContent({ format: "text" }));
  };
  const handleEditorOnInit = (event, editor) => {
    setText(editor.getContent({ format: "text" }));
  };
  const handleVisiblilityChange = useCallback(
    (value) => setVisibilitySelected(value),
    []
  );
  const handleSelectChange = useCallback((value) => setSelect(value), []);

  const handleSave = async () => {
    setIsSaving(true);
    await pageService.post(app, page);
    navigate("/");
  };
  const handleCancel = () => {
    page.title === "" && page.content === ""
      ? navigate("/")
      : setCancelActive(true);
  };
  const handleDiscard = () => {
    page.title === "" && page.content === ""
      ? navigate("/")
      : setDiscardActive(true);
  };

  return (
    <Frame
      logo={{
        width: 124,
        topBarSource:
          "https://cdn.shopify.com/shopifycloud/web/assets/v1/317261b82650a68141f98ad2b08254b653aaff9e2404558fe47747da00293df5.svg",
        contextualSaveBarSource:
          "https://cdn.shopify.com/shopifycloud/web/assets/v1/f5416ec27e17f00a67f8c2d6603088baa6635c7bc2071b4f6533c8d260fc8644.svg",
        url: "https://cdn.shopify.com/shopifycloud/web/assets/v1/317261b82650a68141f98ad2b08254b653aaff9e2404558fe47747da00293df5.svg",
        accessibilityLabel: "logo",
      }}
    >
      <SaveBar
        handleSave={handleSave}
        handleDiscard={handleDiscard}
        disabledStatus={page.title === "" || page.content === ""}
      />
      {isSaving ? <Loading /> : <></>}
      <Page breadcrumbs={[{ content: "Pages", url: "/" }]} title="Add Page">
        <Layout>
          <Layout.Section>
            <EditorCard
              page={page}
              handleTitleChange={handleTitleChange}
              handleEditorChange={handleEditorChange}
              handleEditorOnInit={handleEditorOnInit}
            />
            <SearchEngineCard
              page={page}
              text={text}
              originalURL={page.title}
            />
          </Layout.Section>
          <Layout.Section secondary>
            <VisibilityCard
              visibilitySelected={visibilitySelected}
              handleVisiblilityChange={handleVisiblilityChange}
            />
            <OnlineStoreCard
              handleSelectChange={handleSelectChange}
              select={select}
            />
          </Layout.Section>
        </Layout>
        <br />
        <PageActions
          primaryAction={{
            content: "Save",
            onAction: handleSave,
            disabled: page.title === "" || page.content === "",
          }}
          secondaryActions={[{ content: "Cancel", onAction: handleCancel }]}
        ></PageActions>
        {discardActive ? <ModalDiscard /> : <></>}
        {cancelActive ? <ModalCancel /> : <></>}
      </Page>
    </Frame>
  );
};

export default PageAdd;
