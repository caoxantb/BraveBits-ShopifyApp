import MainPage from "../components/Home/MainPage";
import FooterDefault from "../components/FooterDefault";
import { RecoilRoot } from "recoil";

const HomePage = () => {
  return (
    <>
      <RecoilRoot>
        <MainPage />
        <FooterDefault />
      </RecoilRoot>
    </>
  );
};

export default HomePage;
