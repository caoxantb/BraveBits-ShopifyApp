import { ResourceItem, TextStyle } from "@shopify/polaris";
import { IPageMeta } from "../../interfaces/IPageMeta";

interface PagesTableItemProps {
  item: IPageMeta;
}

const PagesTableItem: React.FC<PagesTableItemProps> = (props) => {
  const { item } = props;
  const { id, url, title, content, updatedAt, updatedAtDateType } = item;
  return (
    <ResourceItem id={id} url={url}>
      <h3>
        <TextStyle variation="strong">{title}</TextStyle>
      </h3>
      <div>
        <TextStyle variation="subdued">{content}</TextStyle>
      </div>
      <div>
        <TextStyle variation="subdued">{updatedAt}</TextStyle>
      </div>
    </ResourceItem>
  );
};

export default PagesTableItem;
