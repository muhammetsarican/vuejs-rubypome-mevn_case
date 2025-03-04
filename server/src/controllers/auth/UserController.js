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

            const authenticatedUser = await AuthenticateRefreshToken(refreshToken, next, res);

            if (!authenticatedUser) return next(new Error("Authentication failed"));
            const response = {
                user: {
                    ...authenticatedUser.toObject(),
                    logged_at: new Date()
                },
                tokens: {
                    access_token: generateBothTokensByUser(authenticatedUser).access_token,
                    refresh_token: refreshToken
                }
            }

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

                    // ? in here, refresh token send with cookie for provide security
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
                ...req.body,
                password: hashPass(req.body.password)
            }

            this.Service.insert(data)
                .then(user => {
                    const response = {
                        user,
                        tokens: generateBothTokensByUser(user)
                    }

                    // ? in here, refresh token send with cookie for provide security
                    setHttpOnlyCookie(res, "refresh_token", response.tokens.refresh_token);

                    res.status(201).send({
                        success: true,
                        message: response
                    })
                })
                .catch(() => {
                    return next(new Error(`Duplicate key error`));
                })
        }
    }

    logout() {
        return (req, res, next) => {
            res.clearCookie("refresh_token").status(200).send({
                success: true,
                message: "You successfully logged out!"
            })
        }
    }
}

module.exports = new UserController();