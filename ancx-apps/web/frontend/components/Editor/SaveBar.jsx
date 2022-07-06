import { ContextualSaveBar } from "@shopify/polaris";

const SaveBar = (props) => {
  const { handleSave, handleDiscard, disabledStatus } = props;
  return (
    <ContextualSaveBar
      message="Unsaved changes"
      saveAction={{
        onAction: handleSave,
        disabled: disabledStatus,
      }}
      discardAction={{
        onAction: handleDiscard,
      }}
    />
  );
};

export default SaveBar;
