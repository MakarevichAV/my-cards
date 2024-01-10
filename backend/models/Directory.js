const mongoose = require('mongoose');

const directorySchema = new mongoose.Schema({
    name: String,
    image: String,
    setsCount: Number,
});

module.exports = mongoose.model('Directory', directorySchema);