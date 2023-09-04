const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: String,
    role: String
}, {
    // Enable strict schema validation
    strict: true
});


const User = mongoose.model("Users", userSchema);

module.exports = User;