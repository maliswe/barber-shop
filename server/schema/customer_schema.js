const Base = require('./user_schema');
mongoose = require('mongoose');

const Customer = Base.discriminator('Customer', new mongoose.Schema({
    appointments: [{ type: String, ref: 'Appointments', required: false }]
}));

module.exports = mongoose.model('Customer');

//This schema defines the structure and properties for customer profiles, including
//their associated appointments.