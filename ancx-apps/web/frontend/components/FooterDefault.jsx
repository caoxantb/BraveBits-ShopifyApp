import { FooterHelp, Link } from "@shopify/polaris";

const FooterDefault = () => {
  return (
    <FooterHelp>
      Learn more about{" "}
      <Link
        url="https://help.shopify.com/en/manual/online-store/themes/theme-structure/pages"
        external
      >
        pages
      </Link>
    </FooterHelp>
  );
};

export default FooterDefault;
