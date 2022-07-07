import { ContextualSaveBar } from "@shopify/polaris";

interface SaveBarProps {
  handleSave: () => void;
  handleDiscard: () => void;
  disabledStatus: boolean;
}

const SaveBar: React.FC<SaveBarProps> = (props) => {
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
