const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const services_schema = new Schema({
    name: { type: String, required: true },
    description: { type: Number, required: true },
    image: { type: String, required: false },
});

const Service = mongoose.model("Services", services_schema);
module.exports = Service;