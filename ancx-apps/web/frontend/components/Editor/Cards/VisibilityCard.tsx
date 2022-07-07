import { Card, ChoiceList, Button } from "@shopify/polaris";

interface VisibilityCardProps {
  visibilitySelected: string[];
  handleVisibilityChange: (value: string[]) => void;
}

const VisibilityCard: React.FC<VisibilityCardProps> = (props) => {
  const { visibilitySelected, handleVisibilityChange } = props;
  return (
    <Card sectioned title="Visibility">
      <ChoiceList
        title=""
        choices={[
          { label: "Visible (as of now)", value: "Visible" },
          { label: "Hidden", value: "Hidden" },
        ]}
        selected={visibilitySelected}
        onChange={handleVisibilityChange}
      />
      <br />
      <Button plain>Set visibility date</Button>
    </Card>
  );
};

export default VisibilityCard;
