import { Modal, TextContainer } from "@shopify/polaris";

import { useRecoilState } from "recoil";
import deleteAtom from "../../../store/deleteAtom";

const ModalDelete = (props) => {
  const { title, handleDelete } = props;

  const [active, setActive] = useRecoilState(deleteAtom);

  return (
    <div>
      <Modal
        open={active}
        onClose={() => setActive(false)}
        title={`Delete ${title}?`}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: () => setActive(false),
          },
          {
            content: "Delete page",
            onAction: handleDelete,
            destructive: true,
          },
        ]}
      >
        <Modal.Section>
          <TextContainer>
            <p>Delete {title}? This can't be undone.</p>
          </TextContainer>
        </Modal.Section>
      </Modal>
    </div>
  );
};

export default ModalDelete;
