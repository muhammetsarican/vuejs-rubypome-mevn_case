const joi = require("joi");

const createValidation = joi.object({
    date: joi.string().required(),
    time: joi.string().required()
});

const updateValidation = joi.object({
    date: joi.string().required(),
    time: joi.string().required()
});

module.exports = {
    createValidation,
    updateValidation
}