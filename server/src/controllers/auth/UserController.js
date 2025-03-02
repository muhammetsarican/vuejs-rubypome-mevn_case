const BaseController = require("../BaseController");

const UserService = require("../../services/auth/UserService");
const { hashPass } = require("../../utils/hashOperations");

class UserController extends BaseController {
    constructor() {
        super(UserService)
    }

    login() {
        return (req, res, next) => {
            const data = {
                mail: req.body.mail,
                password: hashPass(req.body.password)
            }

            this.Service.findOne(data)
                .then(response => {
                    if (!response) return next(new Error("no records found!"));
                    res.status(200).send({
                        success: true,
                        message: response
                    })
                })
        }
    }

    register() {
        return (req, res, next) => {
            console.log(req.body)
            const data = {
                mail: req.body.mail,
                password: hashPass(req.body.password)
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
}

module.exports = new UserController();