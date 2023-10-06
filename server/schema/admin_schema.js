const Base = require('./user_schema');
mongoose = require('mongoose');

const Admin = Base.discriminator('Admin', new mongoose.Schema({

}));

module.exports = mongoose.model('Admin');