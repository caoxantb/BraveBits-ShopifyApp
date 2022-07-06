import PageAdd from "../components/Editor/PageAdd";
import { RecoilRoot } from "recoil";

export default function New() {
  return (
    <>
      <RecoilRoot>
        <PageAdd />
      </RecoilRoot>
    </>
  );
}
