import { atom } from "recoil";

const cancelAtom = atom({
  key: "cancelAtom",
  default: false,
});

export default cancelAtom;
