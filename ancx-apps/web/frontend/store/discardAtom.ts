import { atom, RecoilState } from "recoil";

const discardAtom = <RecoilState<boolean>>atom({
  key: "discardAtom",
  default: false,
});

export default discardAtom;
