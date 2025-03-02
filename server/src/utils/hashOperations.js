const cryptojs = require("crypto-js");

module.exports.hashPass = (password) => {
    return cryptojs.HmacSHA256(password, cryptojs.HmacSHA1(password, process.env.PASSWORD_HASH).toString()).toString();
}