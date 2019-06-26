const express = require('express');
const Flights = require('../models/flights');

const router = express.Router();

/* GET list of flights page. */
router.get('/', (req, res) => {
    Flights.find({}, (err, data) => {
        res.render('flight/flights-list', {
            title: 'List Flights',
            data
        });
    });
});

/* GET flight form. */
router.get('/add', (req, res) => {
    res.render('flight/flight-form', {
        title: 'Add flight',
        errors: '',
        body: {}
    });
});

// Add flight
router.post('/add', (req, res) => {
    const body = req.body;

    const flightData = new Flights(body);
    const errors = flightData.validateSync();

    flightData.save(err => {
        if (err) {
            res.render('flight/flight-form', {
                title: 'Add flight',
                errors,
                body
            });
        }

        res.redirect('/flights');
    });
});

// Delete flight
router.get('/delete/:id', (req, res) => {
    Flights.findByIdAndDelete(req.params.id, err => {
        res.redirect('/flights');
    })
});


module.exports = router;