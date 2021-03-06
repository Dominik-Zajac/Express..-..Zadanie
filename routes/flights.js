const express = require('express');
const Flights = require('../models/flights');
const Tourists = require('../models/tourists');

const router = express.Router();

/* GET list of flights page */
router.get('/', (req, res) => {
	Flights.find({}, (err, data) => {
		res.render('flight/flights-list', {
			title: 'List Flights',
			data
		});
	});
});

/* GET flight form */
router.get('/add', (req, res) => {
	res.render('flight/flight-form', {
		title: 'Add flight',
		errors: '',
		body: {},
		tourists: []
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
				body: {},
				tourists: []
			});
			return;
		}
		res.redirect('/flights');
	});
});

// Delete flight
router.get('/delete/:id', (req, res) => {
	Flights.findByIdAndDelete(req.params.id, err => {
		res.redirect('/flights');
	});
});

/* POST flight form */
router.get('/update/:id', (req, res) => {
	Flights.find({
		_id: req.params.id
	}, (err, data) => {
		Tourists.find({}, (err, tourists) => {
			res.render('flight/flight-update', {
				title: 'Edit Flight',
				tourists,
				data,
			});
		});
	});
});

// Delete tourist with flight
router.get('/update/:idFlight/delete/:id', (req, res) => {
	Tourists.findById(req.params.id, (err, doc) => {
		Flights.findByIdAndUpdate(req.params.idFlight, {
			$pull: {
				'tourists': doc
			}
		}, err => {
			console.log(err);
			res.redirect(`/flights/update/${req.params.idFlight}`);

		});
	});
});

// Update flight (Add passanger)
router.get('/update/:idFlight/add/:id', (req, res) => {
	Tourists.findById(req.params.id, (err, doc) => {
		console.log(doc)
		console.log(req.params.id)
		Flights.findByIdAndUpdate(req.params.idFlight, {
			$push: {
				'tourists': doc
			}
		}, err => {
			console.log(err);
			res.redirect(`/flights/update/${req.params.idFlight}`);

		});
	});
});


module.exports = router;