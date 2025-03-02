const validate = (schema) => (req, res, next) => {
    const { value, error } = schema.validate(req.body);

    if (error) {
        const err = error.details.map(detail => detail.message).join(", ");

        return next(new Error(err));
    }
    Object.assign(req, value);
    return next();
}

module.exports = validate;