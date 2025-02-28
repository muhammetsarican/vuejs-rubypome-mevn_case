const mongoose = require("mongoose");

const db = mongoose.connection;

const { DB_NAME, DB_HOST, DB_PORT } = process.env;

db.once("open", () => {
    console.log("db connection is successful");
})

const connectDb = async () => {
    await mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
}

module.exports = connectDb;