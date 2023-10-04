Base = require('./user_schema');
mongoose = require('mongoose');
const Schema = mongoose.Schema;


const BarberSchema = Base.discriminator("Barber", new mongoose.Schema({
    experties: { type: String, required: true },
    appointments: [{ type: String, ref: 'Appointments', required: true}],
    service: { type: String, ref: 'Services', required: false }
}));

module.exports = mongoose.model('Barber');