const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    phrase: String,
    image: String,
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