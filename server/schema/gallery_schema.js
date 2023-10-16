const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gallery_schema = new Schema({
    image: { type: Buffer, required: true }
});

module.exports = mongoose.model('Gallery', gallery_schema);