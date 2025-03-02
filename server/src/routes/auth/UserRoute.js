const BaseRoute = require("../BaseRoute");

const express = require("express");

const UserController = require("../../controllers/auth/UserController");
const schemas = require("../../validations/auth/UserValidation");
const validate = require("../../middlewares/validate");

const UserRouter = express.Router();

class UserRoute extends BaseRoute {
    constructor() {
        super(UserController, schemas, UserRouter);
    }

    login() {
        this.Router.route("/login").post(validate(schemas.createValidation), this.Controller.login());
    }

    register() {
        this.Router.route("/register").post(this.Controller.register());
    }

    IndexRoutes() {
        this.login();
        this.register();
        return super.IndexRoutes();
    }
}

module.exports.UserRoute = new UserRoute();