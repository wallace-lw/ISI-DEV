import { atom, useAtom } from "jotai";

const dialogAtom = atom(false);

export const useDialog = () => useAtom(dialogAtom);
