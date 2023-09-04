const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const customerSchema = new Schema({
    name: String,
    phone: Number,
    email: String,
    password: String,
    role: String
});


const Customer = mongoose.model("Users", customerSchema);

module.exports = Customer;