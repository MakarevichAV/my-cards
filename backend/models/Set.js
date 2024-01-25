const mongoose = require('mongoose');

const setSchema = new mongoose.Schema({
    name: String,
    image: String,
    cardsCount: Number,
    directoryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
});

const Set = mongoose.model('Set', setSchema);

module.exports = Set;