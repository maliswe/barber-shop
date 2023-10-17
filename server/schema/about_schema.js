const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const about_schema = new Schema({
    text: { type: String, required: true }
});

module.exports = mongoose.model('Abouts', about_schema);