const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
    fullname: String,
    mail: {
        type: String,
        required: true,
        trim: true,
        index: true,
        unique: true,
        uniqueCaseInsensitive: true,
        sparse: true
    },
    password: {
        type: String,
        select: false,
        required: true
    },
    status: String
}, {
    versionKey: false,
    timestamps: true
})

module.exports = mongoose.model("user", UserSchema);