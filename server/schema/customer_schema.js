const Base = require('./user_schema');
mongoose = require('mongoose');

const Customer = Base.discriminator('Customer', new mongoose.Schema({

}));

module.exports = mongoose.model('Customer');