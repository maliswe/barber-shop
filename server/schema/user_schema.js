const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const userSchema = new Schema({
    name: { type: String, required: true },
    phone: { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});


const User = mongoose.model("Users", userSchema);

module.exports = User;

//This schema defines the structure and properties for user profiles, including
//their name, phone number, email, and password.