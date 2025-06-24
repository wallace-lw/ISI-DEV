import { atom, useAtom } from "jotai";

const navbarAtom = atom({
	isOpen: false,
});

export const useNavbar = () => useAtom(navbarAtom);
