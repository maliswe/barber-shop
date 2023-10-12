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