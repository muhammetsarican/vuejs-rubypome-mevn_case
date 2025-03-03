const express = require("express");

const BaseRoute = require("../BaseRoute");

const AppointmentController = require("../../controllers/main/AppointmentController");
const schemas = require("../../validations/main/AppointmentValidation");
const { AuthenticateAccessToken } = require("../../middlewares/authenticate");
const validate = require("../../middlewares/validate");

const AppointmentRouter = express.Router();

class AppointmentRoute extends BaseRoute {
    constructor() {
        super(AppointmentController, schemas, AppointmentRouter);
    }

    slotAppointments() {
        this.Router.route("/slot-appointments").get(AuthenticateAccessToken, this.Controller.slotAppointments());
    }

    // ? this methods overrided for use user id when doing this operation
    create() {
        this.Router.route("/:user_id").post(AuthenticateAccessToken, validate(schemas.createValidation), this.Controller.create());
    }

    // ? this methods overrided for use user id when doing this operation
    list() {
        this.Router.route("/:user_id").get(AuthenticateAccessToken, this.Controller.index());
    }

    IndexRoutes() {
        this.slotAppointments();
        this.create();
        this.list();
        return super.IndexRoutes();
    }
}

module.exports = new AppointmentRoute();