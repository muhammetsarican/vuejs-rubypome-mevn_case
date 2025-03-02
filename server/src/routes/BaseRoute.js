const express = require("express");
const validate = require("../middlewares/validate");
const { AuthenticateAccessToken } = require("../middlewares/authenticate");

class BaseRoute {
    constructor(Controller, Schemas, Router = express.Router()) {
        this.Controller = Controller;
        this.Schemas = Schemas;
        this.Router = Router;
    }
    listOne() {
        this.Router.route("/:id").get(AuthenticateAccessToken, this.Controller.listOne());
    }
    list() {
        this.Router.route("/").get(AuthenticateAccessToken, this.Controller.index());
    }
    create() {
        this.Router.route("/").post(AuthenticateAccessToken, validate(this.Schemas.createValidation), this.Controller.create());
    }
    update() {
        this.Router.route("/:id").patch(AuthenticateAccessToken, validate(this.Schemas.updateValidation), this.Controller.update());
    }
    delete() {
        this.Router.route("/:id").delete(AuthenticateAccessToken, this.Controller.delete());
    }
    IndexRoutes() {
        this.listOne();
        this.list();
        this.create();
        this.update();
        this.delete();
        return this.Router;
    }
}

module.exports = BaseRoute;