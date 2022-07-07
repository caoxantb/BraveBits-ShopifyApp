import { atom, RecoilState } from "recoil";

const deleteAtom = <RecoilState<boolean>>atom({
  key: "deleteAtom",
  default: false,
});

export default deleteAtom;
