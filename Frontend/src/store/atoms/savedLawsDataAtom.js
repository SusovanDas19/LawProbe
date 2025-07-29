import { atom } from "recoil";

export const savedLawsDataAtom = atom({
    key: "savedLawsDataAtom",
    default: {}
})

export const savedLawsPresentAtom = atom({
    key: "savedLawsPresentAtom",
    default: []
})