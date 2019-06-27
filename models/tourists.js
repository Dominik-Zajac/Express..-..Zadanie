const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const touristSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    sex: {
        type: Boolean,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    dateOfBirth: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('Tourists', touristSchema);