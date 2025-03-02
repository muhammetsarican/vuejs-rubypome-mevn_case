class BaseController {
    constructor(service) {
        // takes service, we override it in special controllers
        this.Service = service;
    }

    listOne(status = "true") {
        return (req, res, next) => {
            req.body = { ...req.body, _id: req.params.id, status };
            this.Service.findOne(req.body)
                .then(response => {
                    if (!response) return next(new Error("No records found!"));
                    res.status(200).send({
                        success: true,
                        message: response
                    })
                })
        }
    }

    index(status = "true") {
        return (req, res, next) => {
            this.Service.list({ status })
                .then(response => {
                    if (!response.length) return next(new Error("No records found!"));
                    res.status(200).send({
                        success: true,
                        message: response
                    })
                })
        }
    }

    create(status = "true") {
        return (req, res, next) => {
            req.body.status = status;
            this.Service.insert(req.body)
                .then(response => {
                    res.status(201).send({
                        success: true,
                        message: response
                    })
                })
                .catch(err => {
                    if (err.code === 11000) return next(new Error(`Duplicate key error, the key(s): '${Object.keys(err.keyValue).join(", ")}'`));
                    return next(new Error(err, 500));
                });
        }
    }

    update() {
        return (req, res, next) => {
            this.Service.modify(req.params.id, req.body)
                .then(response => {
                    if (!response) return next(new Error("No records found!"));
                    res.status(200).send({
                        success: true,
                        message: response
                    })
                })
                .catch(err => {
                    if (err.code === 11000) return next(new Error(`Duplicate key error, the key(s): '${Object.keys(err.keyValue).join(", ")}'`));
                    return next(new Error(err, 500));
                });
        }
    }

    delete() {
        return (req, res, next) => {
            this.Service.remove(req.params.id)
                .then(response => {
                    if (!response) return next(new Error("No records found!"));
                    res.status(200).send({
                        success: true,
                        message: response
                    })
                })
        }
    }
}

module.exports = BaseController;