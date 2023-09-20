Base = require('./user_schema');
mongoose = require('mongoose');
const Schema = mongoose.Schema;


const BarberSchema = Base.discriminator("Barber", new mongoose.Schema({
    experties: { type: String, required: true },
    image: { type: String, required: false },
    appointments: [{ type: String, ref: 'Appointments', required: true}],
    service: [{ type: Schema.Types.ObjectId, ref: 'Services', required: false }],
}));

module.exports = mongoose.model('Barber');