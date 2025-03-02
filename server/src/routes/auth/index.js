const express = require("express");
const { UserRoute } = require("./UserRoute");

const app = express();

app.get("/", (req, res, next) => {
    res.status(200).send({
        success: true,
        message: "welcome to auth, you can do login and register operations under this route."
    })
});

app.use("/user", UserRoute.IndexRoutes());

module.exports.auth = app;