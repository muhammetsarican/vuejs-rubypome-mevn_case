const express = require("express");
const { config } = require("./config");
const { startConn } = require("./loaders");

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
});