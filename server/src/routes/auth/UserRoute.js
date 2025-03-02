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

    // ? with this route you can reach your account without login
    checkToken() {
        this.Router.route("/check-token").get(this.Controller.checkToken());
    }

    // ? login method
    login() {
        this.Router.route("/login").post(validate(schemas.createValidation), this.Controller.login());
    }

    // ? register method
    register() {
        this.Router.route("/register").post(this.Controller.register());
    }

    // ? routes can add or remove from here
    IndexRoutes() {
        this.checkToken();
        this.login();
        this.register();
        return this.Router;
    }
}

module.exports.UserRoute = new UserRoute();