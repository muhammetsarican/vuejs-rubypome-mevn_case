const BaseRoute = require("../BaseRoute");

const express = require("express");

const UserController = require("../../controllers/auth/UserController");
const schemas = require("../../validations/auth/UserValidation");

const UserRouter = express.Router();

class UserRoute extends BaseRoute {
    constructor() {
        super(UserController, schemas, UserRouter);
    }
}

module.exports.UserRoute = new UserRoute();