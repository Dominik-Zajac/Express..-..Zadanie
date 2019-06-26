const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    departureDate: {
        type: Date,
        required: true
    },
    arrivelDate: {
        type: Date,
        default: +new Date() + 7 * 24 * 60 * 60 * 1000,
        required: true
    },
    places: {
        type: Number,
        required: true
    },
    ticketPrice: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('Flightss', newsSchema);