const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    departureDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    arrivelDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    places: {
        type: Number,
        required: true,
    },
    ticketPrice: {
        type: Number,
        required: true,
    },
    tourists: {
        type: Array,
        required: true,
        default: []
    }
});

module.exports = mongoose.model('Flights', flightSchema);