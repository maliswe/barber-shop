const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const adminSchema = new Schema({
    name: String,
    password: String,
    role: String
});


const Admin = mongoose.model("Users", adminSchema);

module.exports = Admin;