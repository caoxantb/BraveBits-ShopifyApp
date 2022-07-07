import { Modal, TextContainer } from "@shopify/polaris";

import { useNavigate } from "react-router-dom";

import { useRecoilState } from "recoil";
import discardAtom from "../../../store/discardAtom";

const ModalDiscard: React.FC = () => {
  const navigate = useNavigate();

  const [active, setActive] = useRecoilState<boolean>(discardAtom);

  return (
    <div>
      <Modal
        open={active}
        onClose={() => setActive(false)}
        title="Discard all unsaved changes"
        secondaryActions={[
          {
            content: "Continue editing",
            onAction: () => setActive(false),
          },
          {
            content: "Discard changes",
            onAction: () => navigate("/"),
            destructive: true,
          },
        ]}
      >
        <Modal.Section>
          <TextContainer>
            <p>
              If you discard changes, you'll delete any edits you made since you
              last saved.
            </p>
          </TextContainer>
        </Modal.Section>
      </Modal>
    </div>
  );
};

export default ModalDiscard;
