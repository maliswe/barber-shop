const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    status: { type: String, required: true },
    price: { type: Number, required: true },
    date: { type: Date, default: Date.now,required: false },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    }
});

const Appointment = mongoose.model("Appointments", appointmentSchema);
module.exports= Appointment;