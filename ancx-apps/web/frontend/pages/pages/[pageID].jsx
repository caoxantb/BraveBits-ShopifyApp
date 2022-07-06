import { useParams } from "react-router-dom";
import { RecoilRoot } from "recoil";

import PageView from "../../components/Editor/PageView";

const SinglePage = () => {
  const { pageID } = useParams();
  return (
    <>
      <RecoilRoot>
        <PageView id={pageID} />
      </RecoilRoot>
    </>
  );
};

export default SinglePage;
