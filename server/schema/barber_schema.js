Base = require('./user_schema');
mongoose = require('mongoose');

const BarberSchema = Base.discriminator("Barber", new mongoose.Schema({

}));

module.exports = mongoose.model('Barber');