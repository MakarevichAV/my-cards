const mongoose = require('mongoose');

const directorySchema = new mongoose.Schema({
    name: String,
    image: String,
    setsCount: Number,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
});

const Directory = mongoose.model('Directory', directorySchema);

module.exports = Directory;