const BaseService = require("../BaseService");

const AppointmentModel = require("../../models/main/AppointmentModel");

class AppointmentService extends BaseService {
    constructor() {
        super(AppointmentModel);
    }
}

module.exports = new AppointmentService();