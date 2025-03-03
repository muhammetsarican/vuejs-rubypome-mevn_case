const express = require("express");
const { UserRoute } = require("./auth/UserRoute");
const AppointmentRoute = require("./main/AppointmentRoute");

const app = express();

app.get("/", (req, res, next) => {
    res.status(200).send({
        success: true,
        message: "welcome to auth, you can do login and register operations under this route."
    })
});

app.use("/user", UserRoute.IndexRoutes());
app.use("/appointment", AppointmentRoute.IndexRoutes());

module.exports.auth = app;