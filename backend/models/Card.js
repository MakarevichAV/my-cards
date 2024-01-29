const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    image: String,
    phrase: String,
    transcription: String,
    note: String,
    example1: String,
    translation: String,
    example2: String,
    setId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    directoryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;