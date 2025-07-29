import { atom } from "recoil";

export const readLaterDataAtom = atom({
    key: "readLaterDataAtom",
    default: {}
})

export const readLaterLawsPresentAtom = atom({
    key: "readLaterLawsPresentAtom",
    default: []
})