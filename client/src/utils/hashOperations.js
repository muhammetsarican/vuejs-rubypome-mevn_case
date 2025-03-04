import cryptojs from "crypto-js";

export const hashPass = (password) => {
    return cryptojs.HmacSHA256(password, cryptojs.HmacSHA1(password, import.meta.env.VITE_PASSWORD_HASH).toString()).toString();
}