const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    status: String,
    price: Number,
    serviceID: String,
    barberID: String
}, {
    strict: true
});

const Appointment = mongoose.model("appointments", appointmentSchema);

module.exports= Appointment;