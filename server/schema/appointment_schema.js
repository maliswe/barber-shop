const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    status: String,
    price: Number,
    serviceID: String,
    barberID: String
});

const Appointment = mongoose.model("Appointments", appointmentSchema);

module.exports= Appointment;