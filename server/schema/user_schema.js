const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const userSchema = new Schema({
    name: String,
    phone: Number,
    email: String,
    password: String 
}, {
    role: {
        type: String,
        enum: ['customer', 'admin', 'barber'],
    }
});


const User = mongoose.model("Users", userSchema);

module.exports = User;
