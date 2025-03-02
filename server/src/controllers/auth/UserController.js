const BaseController = require("../BaseController");

const UserService = require("../../services/auth/UserService");
const { hashPass } = require("../../utils/hashOperations");
const { generateBothTokensByUser } = require("../../utils/tokenOperations");
const { setHttpOnlyCookie } = require("../../utils/cookieOperations");
const { AuthenticateRefreshToken } = require("../../middlewares/authenticate");

class UserController extends BaseController {
    constructor() {
        super(UserService)
    }

    // ? this method for create session without login
    checkToken() {
        return async (req, res, next) => {
            const refreshToken = req.headers.cookie?.split("refresh_token=")[1]?.split(";")[0] || "";

            const response = await AuthenticateRefreshToken(refreshToken, next, res);

            if (!response) return next(new Error("Authentication failed"));
            response.message = {
                user: {
                    ...response.message.toObject(),
                    logged_at: new Date()
                },
                tokens: {
                    access_token: generateBothTokensByUser(response.message).access_token,
                    refresh_token: refreshToken
                }
            }

            // ? in here, refresh token send with cookie for provide security
            setHttpOnlyCookie(res, "refresh_token", response.message.tokens.refreshToken);

            res.status(200).send({
                success: true,
                message: response
            });
        }
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

                    setHttpOnlyCookie(res, "refresh_token", response.tokens.refresh_token);

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

                    setHttpOnlyCookie(res, "refresh_token", response.tokens.refresh_token);

                    res.status(201).send({
                        success: true,
                        message: response
                    })
                })
        }
    }
}

module.exports = new UserController();