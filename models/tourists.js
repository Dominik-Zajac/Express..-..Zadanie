const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const touristSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    sex: {
        type: String,
    },
    state: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    flights: {
        type: Array,
        required: true,
        default: []
    }
});

module.exports = mongoose.model('Tourists', touristSchema);