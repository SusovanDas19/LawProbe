import { atom } from "recoil";

const savedUsername = localStorage.getItem("username") || "Guest";

export const usernameAtom = atom({
    key: "user",
    default: savedUsername
})