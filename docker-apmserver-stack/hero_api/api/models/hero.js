const mongoose = require('mongoose');

const heroSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    power: String,
    about: String,
    imgUrl: String
}, { collection: 'Heroes' });

module.exports = mongoose.model('Hero', heroSchema);