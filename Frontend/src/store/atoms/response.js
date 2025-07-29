import { atom } from "recoil";

export const responseAtom = atom({
    key: "response",
    default: null
})

export const errorResponse = atom({
    key: "errorResponse",
    default: null
})