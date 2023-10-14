const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const appointmentSchema = new Schema({
    confNumber: { type: String, required: true, unique: true },
    status: {
        type: String,
        required: true,
        enum: ['Scheduled', 'Completed', 'Cancelled'],
        default: 'Scheduled'
    },
    price: { type: Number, required: true },
    date: { type: Date, required: true },
    message: {type: String, required: false},
    service: [{ type: Schema.Types.ObjectId, ref: 'Services', required: false }],
    barber: [{ type: Number, ref: 'Barber', required: false }],
    customer: { type: Number, ref: 'Customer', required: false }
});

const Appointment = mongoose.model("Appointments", appointmentSchema);
module.exports = Appointment;

//This schema defines the structure and properties for appointments, including
//the confirmation number, status, price, date, and relationships with services,
//barbers, and customers.