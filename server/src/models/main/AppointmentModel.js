const { default: mongoose } = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "user"
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model("appointment", AppointmentSchema);