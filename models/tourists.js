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
        type: String,
        // required: true
    },
    state: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
});

module.exports = mongoose.model('Tourists', touristSchema);