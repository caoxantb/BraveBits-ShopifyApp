import PageAdd from "../components/Editor/PageAdd";
import { RecoilRoot } from "recoil";

const New: React.FC = () => {
  return (
    <>
      <RecoilRoot>
        <PageAdd />
      </RecoilRoot>
    </>
  );
};

export default New;
