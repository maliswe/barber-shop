const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    status: { type: String, required: true },
    price: { type: Number, required: true },
});

const Appointment = mongoose.model("Appointments", appointmentSchema);
module.exports= Appointment;