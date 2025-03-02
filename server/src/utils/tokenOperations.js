const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
    return jwt.sign({ name: user.mail, ...user }, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: "1h" });
}

const generateRefreshToken = (user) => {
    return jwt.sign({ name: user.mail, ...user }, process.env.REFRESH_TOKEN_SECRET_KEY, { expiresIn: "1h" });
}

const generateBothTokensByUser = (user) => {
    return {
        access_token: generateAccessToken(user),
        refresh_token: generateRefreshToken(user),
    }
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    generateBothTokensByUser,
}