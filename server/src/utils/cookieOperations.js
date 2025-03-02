module.exports.setHttpOnlyCookie = (res, title, value) => {
    res.cookie(title, value, {
        secure: process.env.NODE_ENV !== "development",
        httpOnly: true,
        sameSite: "strict"
    });
}