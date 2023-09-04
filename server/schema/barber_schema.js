const mongoose = require('mongoose');
const schema = mongoose.schema;


const barberSchema = new Schema({
    name: String,
    email: String,
    phone: Number,
    password: String,
    avalibility: Date,
    Expertise: String,
    Image: String,
    role: String

})

const Barber = mongoose.model('Users', barberSchema);

module.exports = Barber;