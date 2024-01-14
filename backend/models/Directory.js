const mongoose = require('mongoose');

const directorySchema = new mongoose.Schema({
    name: String,
    image: String,
    setsCount: Number,
    owner: {
        userId: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const Directory = mongoose.model('Directory', directorySchema);

module.exports = Directory;