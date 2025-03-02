const express = require("express");
const { config } = require("./config");
const { startConn } = require("./loaders");
const { auth } = require("./routes/auth");
const errorHandler = require("./middlewares/errorHandler");

// ? dotenv using for get env vars
config();

const app = express();

app.use(express.json());

// ? server initiated
const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
    console.log(`app running on ${PORT}`);
    // ? db module starting
    startConn();

    app.get("/", (req, res, next) => {
        res.status(200).send({
            success: true,
            message: "welcome to rubypome, enjoy your journey."
        })
    })

    // ? auth route
    app.use("/auth", auth);

    // ? error handler for prevent down the server
    app.use(errorHandler);
});