const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const services_schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: {type: Number, required: true},
    duration: {type: Number, required: true},
    image: { type: Buffer, required: false }
});

const Service = mongoose.model("Services", services_schema);
module.exports = Service;