import { Modal, TextContainer } from "@shopify/polaris";

import { useNavigate } from "react-router-dom";

import { useRecoilState } from "recoil";
import cancelAtom from "../../../store/cancelAtom";

const ModalCancel = () => {
  const navigate = useNavigate();

  const [active, setActive] = useRecoilState(cancelAtom);

  return (
    <div>
      <Modal
        open={active}
        onClose={() => setActive(false)}
        title="You have unsaved changes"
        secondaryActions={[
          {
            content: "Cancel",
            onAction: () => setActive(false),
          },
          {
            content: "Leave page",
            onAction: () => navigate("/"),
            destructive: true,
          },
        ]}
      >
        <Modal.Section>
          <TextContainer>
            <p>If you leave this page, all unsaved changes will be lost.</p>
          </TextContainer>
        </Modal.Section>
      </Modal>
    </div>
  );
};

export default ModalCancel;
