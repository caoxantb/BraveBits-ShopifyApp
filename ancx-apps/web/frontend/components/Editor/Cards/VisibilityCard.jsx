import { Card, ChoiceList, Button } from "@shopify/polaris";

const VisibilityCard = (props) => {
  const { visibilitySelected, handleVisiblilityChange } = props;
  return (
    <Card sectioned title="Visibility">
      <ChoiceList
        choices={[
          { label: "Visible (as of now)", value: "Visible" },
          { label: "Hidden", value: "Hidden" },
        ]}
        selected={visibilitySelected}
        onChange={handleVisiblilityChange}
      />
      <br />
      <Button plain>Set visibility date</Button>
    </Card>
  );
};

export default VisibilityCard;
