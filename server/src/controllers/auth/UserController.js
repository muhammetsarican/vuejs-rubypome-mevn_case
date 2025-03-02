const BaseController = require("../BaseController");

const UserService = require("../../services/auth/UserService");

class UserController extends BaseController {
    constructor() {
        super(UserService)
    }
}

module.exports = new UserController();