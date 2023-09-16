const mongoose = require('mongoose');
const Schema = mongoose.Schema;

 
const appointmentSchema = new Schema({
    confNumber: {type: String, required: true, unique: true},
    status: { 
        type: String, 
        required: true, 
        enum: ['Scheduled', 'Completed', 'Cancelled']
    },
    price: { type: Number, required: true },
    date: { type: Date, required: true }
});

const Appointment = mongoose.model("Appointments", appointmentSchema);
module.exports= Appointment;