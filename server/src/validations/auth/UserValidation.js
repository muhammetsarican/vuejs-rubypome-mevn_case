const joi = require("joi");

const createValidation = joi.object({
    fullname: joi.string().min(3).max(30),
    mail: joi.string().min(3).max(50).required(),
    password: joi.string().min(8).max(70).required()
})

const updateValidation = joi.object({
    fullname: joi.string().min(3).max(30),
    mail: joi.string().min(3).max(50),
    password: joi.string().min(8).max(70)
})

module.exports = {
    createValidation,
    updateValidation
}