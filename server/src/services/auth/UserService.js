const BaseService = require("../BaseService");

const UserModel = require("../../models/auth/UserModel");

class UserService extends BaseService {
    constructor() {
        super(UserModel)
    }
}

module.exports = new UserService();