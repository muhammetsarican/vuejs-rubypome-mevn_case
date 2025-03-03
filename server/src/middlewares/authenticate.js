const jwt = require("jsonwebtoken");
const UserService = require("../services/auth/UserService");

// ? this is for check the access token valid or not
module.exports.AuthenticateAccessToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];

    if (token == null) return res.status(401).send({
        success: false,
        message: "You have to sign in for do this process!"
    })

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
        if (err) return next(new Error(err));

        const where = {
            _id: user._doc._id,
            status: user._doc.status,
            updatedAt: user._doc.updatedAt,
            createdAt: user._doc.createdAt,
        }

        UserService.findOne(where)
            .then(response => {
                req.user = response;
                next();
            })
    })
}

// ? this is for generate access token with refresh token for access the account without login
module.exports.AuthenticateRefreshToken = (token, cb, res) => {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET_KEY, async (err, user) => {
        if (err) {
            res.clearCookie("refresh_token");
            return cb(new Error(err))
        };

        const where = {
            _id: user._doc._id,
            status: user._doc.status,
            updatedAt: user._doc.updatedAt,
            createdAt: user._doc.createdAt,
        }

        const response = await UserService.findOne(where)

        if (!response) {
            res.clearCookie("refresh_token");
            return cb(new Error("User not found!"));
        }

        return response;
    })
}