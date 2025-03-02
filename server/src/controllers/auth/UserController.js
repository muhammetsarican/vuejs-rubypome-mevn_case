const BaseController = require("../BaseController");

const UserService = require("../../services/auth/UserService");
const { hashPass } = require("../../utils/hashOperations");
const { generateBothTokensByUser } = require("../../utils/tokenOperations");

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
                .then(user => {
                    if (!user) return next(new Error("no records found!"));
                    const response = {
                        user,
                        tokens: generateBothTokensByUser(user)
                    }

                    res.status(200).send({
                        success: true,
                        message: response
                    })
                })
        }
    }

    register() {
        return (req, res, next) => {
            const data = {
                mail: req.body.mail,
                password: hashPass(req.body.password)
            }

            this.Service.insert(data)
                .then(user => {
                    const response = {
                        user,
                        tokens: generateBothTokensByUser(user)
                    }

                    res.status(201).send({
                        success: true,
                        message: response
                    })
                })
        }
    }
}

module.exports = new UserController();