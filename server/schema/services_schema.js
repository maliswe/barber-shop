const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const services_schema = new Schema({
    _id: { type: Number, required: true, unique: true},
    name: { type: String, required: true, unique: true},
    description: { type: String, required: true },
    image: { type: String, required: false },
});

const Service = mongoose.model("Services", services_schema);
module.exports = Service;