const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    places: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('Flightss', newsSchema);