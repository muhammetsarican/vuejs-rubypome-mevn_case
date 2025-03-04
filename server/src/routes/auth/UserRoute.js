const BaseRoute = require("../BaseRoute");

const express = require("express");

const UserController = require("../../controllers/auth/UserController");
const schemas = require("../../validations/auth/UserValidation");
const validate = require("../../middlewares/validate");
const { AuthenticateAccessToken } = require("../../middlewares/authenticate");

const UserRouter = express.Router();

class UserRoute extends BaseRoute {
    constructor() {
        super(UserController, schemas, UserRouter);
    }

    // ? with this route you can reach your account without login
    checkToken() {
        this.Router.route("/check-token").get(this.Controller.checkToken());
    }

    // ? login route
    login() {
        this.Router.route("/login").post(validate(schemas.createValidation), this.Controller.login());
    }

    // ? register route
    register() {
        this.Router.route("/register").post(validate(schemas.createValidation), this.Controller.register());
    }

    // ? logout route
    logout() {
        this.Router.route("/logout").get(AuthenticateAccessToken, this.Controller.logout());
    }

    // ? routes can add or remove from here
    IndexRoutes() {
        this.checkToken();
        this.login();
        this.register();
        this.logout();
        return this.Router;
    }
}

module.exports.UserRoute = new UserRoute();