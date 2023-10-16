Base = require('./user_schema');
mongoose = require('mongoose');
const Schema = mongoose.Schema;



const BarberSchema = Base.discriminator("Barber", new mongoose.Schema({
    experties: { type: String, required: true },
    appointments: [{ type: String, ref: 'Appointments', required: false }],
    service: [{ type: Schema.Types.ObjectId, ref: 'Services', required: false }],
    availability: [{
        date: { type: Date, required: true },
        timeSlots: [{
            startTime: { type: String, required: true},
            endTime: { type: String, required: true}
        }],
    }]
}));

module.exports = mongoose.model('Barber');

//This schema defines the structure and properties for barber profiles
//This allows adding specific properties for barber profiles.
//Expertise or specialization of the barber.
//Appointments associated with the barber.
//Services offered by the barber.
//Availability of the barber, including dates and time slots.


