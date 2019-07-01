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

	})


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
	Flights.findById(req.params.idFlight, (err, doc) => {
		// const flights = doc;
		// flights.tourists.findand(req.params.id, err => {
		// 	// console.log(req.params.id)
		// 	console.log('dziala')
		// doc.tourists = 
		// })

		res.redirect(`/flights/update/${req.params.idFlight}`);
	});
	// const flight = Flights.find({
	// 	_id: req.params.idFlight
	// }, (err, res) => {
	// 	return res;
	// })
	// console.log(flight)

	// Flights.findByIdAndRemove(req.params.id, err => {
	// 	res.redirect(`/flights/update/${req.params.idFlight}`);

	// })
});

// Update flight
router.get('/update/:idFlight/add/:id', (req, res) => {
	console.log('dziala update POST');
	const findFlight = Flights.findById(req.params.idFlight);
	console.log(findFlight)
	// Flights.findByIdAndUpdate(req.params.idFlight, req.body.profile, function (err, doc, res) {
	// 	console.log(req.params.idFlight);
	// 	console.log(doc)
	// 	console.log(req)

	// error: any errors that occurred
	// doc: the document before updates are applied if `new: false`, or after updates if `new = true`
	// });
	// const data = new Flights(doc);
	// console.log(data)
	// const body = req.body;

	// console.log(body);
	// const flightData = new Flights();

	// console.log(flightData.tourists);

	// const touristData = new Tourists();

	// console.log(touristData.flights)
	// touristData.save(err => {
	// 	if (err) {

	// 	}
	// });
	res.redirect(`/flights/update/${req.params.idFlight}`)

});


module.exports = router;