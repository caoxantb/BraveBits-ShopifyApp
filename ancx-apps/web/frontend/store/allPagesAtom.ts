import { atom, RecoilState } from "recoil";
import { IPageMeta } from "../interfaces/IPageMeta";

const allPagesAtom = atom<IPageMeta[]>({
  key: "allPagesAtom",
  default: [],
});

export default allPagesAtom;
