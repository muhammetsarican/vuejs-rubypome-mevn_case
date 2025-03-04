const joi = require("joi");

const createValidation = joi.object({
    date: joi.string().min(3).max(15).required(),
    time: joi.string().min(3).max(15).required()
});

const updateValidation = joi.object({
    date: joi.string().min(3).max(15),
    time: joi.string().min(3).max(15)
});

module.exports = {
    createValidation,
    updateValidation
}