const express = require("express");

const BaseRoute = require("../BaseRoute");

const AppointmentController = require("../../controllers/main/AppointmentController");
const schemas = require("../../validations/main/AppointmentValidation");
const { AuthenticateAccessToken } = require("../../middlewares/authenticate");

const AppointmentRouter = express.Router();

class AppointmentRoute extends BaseRoute {
    constructor() {
        super(AppointmentController, schemas, AppointmentRouter);
    }

    slotAppointments() {
        this.Router.route("/slot-appointments").get(this.Controller.slotAppointments());
    }

    IndexRoutes() {
        this.slotAppointments();
        return super.IndexRoutes();
    }
}

module.exports = new AppointmentRoute();