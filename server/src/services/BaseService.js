class BaseService {
    constructor(model) {
        // gets model, it'll override in special services
        this.Model = model
    }

    // count
    count(where) {
        return this.Model.countDocuments(where);
    }

    // findOne
    findOne(where) {
        return this.Model.findOne(where);
    }

    // lists all records
    list(where) {
        return this.Model.find(where || {});
    }

    // creates new record
    insert(data) {
        return new this.Model(data).save();
    }

    // creates new record(s) as an array
    createMany(data) {
        return this.Model.create(data);
    }

    // updates a record
    modify(id, data) {
        return this.Model.findOneAndUpdate({ _id: id }, data, { new: true });
    }

    updateMany(where, data) {
        return this.Model.updateMany(where, data);
    }

    // removes a record
    remove(id) {
        return this.Model.findOneAndDelete({ _id: id }, { new: true });
    }

    // removes many records
    removeMany(where) {
        return this.Model.deleteMany(where, { new: true });
    }
}

module.exports = BaseService;