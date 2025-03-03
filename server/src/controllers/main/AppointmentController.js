const BaseController = require("../BaseController");

const AppointmentService = require("../../services/main/AppointmentService");
const { slotAppointments, filterSlotAppointments } = require("../../helpers/filterSlotAppointments");

class AppointmentController extends BaseController {
    constructor() {
        super(AppointmentService);
    }

    slotAppointments() {
        return (req, res, next) => {
            this.Service.list()
                .then(appointments => {
                    const response = filterSlotAppointments(appointments);
                    if (!response.length) return next(new Error("No records found"));
                    res.status(200).send({
                        success: true,
                        message: response
                    })
                })
        }
    }
}

module.exports = new AppointmentController();