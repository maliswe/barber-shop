const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const adminSchema = new Schema({
    name: String,
    role: String
}, {
    // Enable strict schema validation
    strict: true
});


const Admin = mongoose.model("Admins", adminSchema);

module.exports = Admin;