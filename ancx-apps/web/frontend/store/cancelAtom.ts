import { atom, RecoilState } from "recoil";

const cancelAtom = <RecoilState<boolean>>atom({
  key: "cancelAtom",
  default: false,
});

export default cancelAtom;
