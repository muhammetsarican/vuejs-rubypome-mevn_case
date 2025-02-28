const express = require("express");

const app = express();

app.get("/", (req, res, next) => {
    res.status(200).send({
        success: true,
        message: "welcome to auth, you can do login and register operations under this route."
    })
})

module.exports.auth = app;