import { Card, TextContainer, Select } from "@shopify/polaris";

const OnlineStoreCard = (props) => {
  const { handleSelectChange, select } = props;
  return (
    <Card title="Online store" sectioned>
      <TextContainer spacing="tight">
        <Select
          label="Theme template"
          options={[
            { label: "Default Page", value: "Default Page" },
            { label: "Contact", value: "Contact" },
          ]}
          onChange={handleSelectChange}
          value={select}
        />
        <p>
          Assign a template from your current theme to define how the page is
          displayed.
        </p>
      </TextContainer>
    </Card>
  );
};

export default OnlineStoreCard;
