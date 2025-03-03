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

    create() {
        return (req, res, next) => {
            const data = {
                user_id: req.params.user_id,
                date: req.body.date,
                time: req.body.time,
            }

            this.Service.insert(data)
                .then(response => {
                    res.status(201).send({
                        success: true,
                        message: response
                    })
                })
        }
    }

    index() {
        return (req, res, next) => {
            const where = {
                user_id: req.params.user_id
            }

            this.Service.list(where)
                .then(response => {
                    if (!response.length) return next(new Error("No records found!"));
                    res.status(200).send({
                        success: true,
                        message: response
                    })
                })
        }
    }
}

module.exports = new AppointmentController();