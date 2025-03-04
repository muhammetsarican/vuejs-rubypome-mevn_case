export const validate = (schema, object) => {
    const { value, error } = schema.validate(object);

    if (error) {
        const err = error.details.map(detail => ({
            label: detail.context.label,
            message: detail.message,
        }))[0];

        console.log(error.details)
        console.log(err);

        return err;
    }
    return false;
}