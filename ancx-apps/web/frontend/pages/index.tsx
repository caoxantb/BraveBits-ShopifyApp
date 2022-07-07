import MainPage from "../components/Home/MainPage";
import { RecoilRoot } from "recoil";

const HomePage: React.FC = () => {
  return (
    <>
      <RecoilRoot>
        <MainPage />
      </RecoilRoot>
    </>
  );
};

export default HomePage;
