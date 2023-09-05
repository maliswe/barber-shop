const Base = require('./user_schema');
mongoose = require('mongoose');

const Barber = Base.discriminator('Admin', new mongoose.Schema({

}));

module.exports = mongoose.model('Admin');