const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const userSchema = new Schema({
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true } 
}, {
    role: {
        type: String,
        enum: ['customer', 'admin', 'barber'],
    }
});


const User = mongoose.model("Users", userSchema);

module.exports = User;
