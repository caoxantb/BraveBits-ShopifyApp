import { Card, TextStyle } from "@shopify/polaris";

const SearchEngineCard = (props) => {
  const { page, text, originalURL } = props;
  const URL = "https://ancx-apps.myshopify.com/pages/";

  return (
    <Card
      title="Search engine listing preview"
      sectioned
      actions={[{ content: "Edit SEO content" }]}
    >
      {page.title === "" || page.content === "" ? (
        <div></div>
      ) : (
        <div>
          <p style={{ color: "blue", fontSize: "1.2rem" }}>{page.title}</p>
          <p>
            <TextStyle variation="positive">
              {URL}
              {originalURL}
            </TextStyle>
          </p>
          <p>
            <TextStyle variation="subdued">{text}</TextStyle>
          </p>
        </div>
      )}
    </Card>
  );
};

export default SearchEngineCard;
