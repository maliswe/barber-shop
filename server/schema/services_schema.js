const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const services_schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: false },
    price: {type: Number, required: true}
});

const Service = mongoose.model("Services", services_schema);
module.exports = Service;