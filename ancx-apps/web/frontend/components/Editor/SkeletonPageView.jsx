import {
  SkeletonPage,
  Layout,
  Card,
  TextContainer,
  SkeletonBodyText,
  SkeletonDisplayText,
} from "@shopify/polaris";

const SkeletonPageView = () => {
  return (
    <SkeletonPage breadcrumbs title="" primaryAction>
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <TextContainer>
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText />
            </TextContainer>
            <br />
            <TextContainer>
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText />
            </TextContainer>
          </Card>
          <Card sectioned>
            <SkeletonBodyText />
            <br />
            <SkeletonBodyText />
          </Card>
        </Layout.Section>
        <Layout.Section secondary>
          <Card sectioned>
            <SkeletonBodyText />
            <SkeletonBodyText />
          </Card>
          <Card sectioned>
            <SkeletonBodyText />
            <SkeletonBodyText />
          </Card>
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  );
};

export default SkeletonPageView;
