import { atom } from "recoil";

export const showToastAtom = atom({
    key: "showAtom",
    default: false
})

export const toastMsgAtom = atom({
    key: "toastMsg",
    default: ""
})

export const toastIconColorAtom = atom({
    key: "toastColor",
    default: ""
})