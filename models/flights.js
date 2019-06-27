const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
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

module.exports = mongoose.model('Flights', flightSchema);