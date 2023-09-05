const Base = require('./user_schema');
mongoose = require('mongoose');

const Customer = Base.discriminator('Customer', new mongoose.Schema({
    appointments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Appointments'
        }
    ]
}));

module.exports = mongoose.model('Customer');