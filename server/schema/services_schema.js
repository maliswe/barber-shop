const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const services_schema = new Schema({
    name: String,
    description: Number,
    image: String,
});


const Customer = mongoose.model("Services", customerSchema);

module.exports = Services;