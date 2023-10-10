const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gallery_schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: Buffer, required: true }
});

const Gallery = mongoose.model("Gallery", gallery_schema);
module.exports = Gallery;