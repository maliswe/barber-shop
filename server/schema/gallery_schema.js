const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gallery_schema = new Schema({
    image: { type: Buffer, required: true }
});

const Gallery = mongoose.model("Gallery", gallery_schema);
module.exports = Gallery;

//This schema defines the structure and properties for storing images in a gallery,
//including the binary image data.