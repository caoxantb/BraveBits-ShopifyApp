import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { Frame, Page, Layout, Card } from "@shopify/polaris";

import PagesEmptyCard from "./PagesEmptyCard";
import PagesTable from "./PagesTable";
import pageService from "../../services/pageService";
import { useAppBridge } from "@shopify/app-bridge-react";

const MainPage = () => {
  const app = useAppBridge();
  const navigate = useNavigate();
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    pageService.getCount(app).then((res) => setCounter(res.count));
  }, []);

  return (
    <Frame>
      <Page
        title="Pages"
        primaryAction={{
          content: "Add Page",
          onAction: () => navigate("/new"),
        }}
      >
        <Layout>
          <Layout.Section>
            <Card sectioned>
              <PagesTable />
              {/* {counter === 0 ? <PagesEmptyCard /> : <PagesTable />} */}
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </Frame>
  );
};

export default MainPage;
