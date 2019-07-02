const express = require('express');
const Tourists = require('../models/tourists');
const Flights = require('../models/flights');

const router = express.Router();

/* GET list of tourists page */
router.get('/', (req, res) => {
	Tourists.find({}, (err, data) => {
		res.render('tourist/tourists-list', {
			title: 'List Tourists',
			data
		});
	});
});

/* GET tourist form */
router.get('/add', (req, res) => {
	res.render('tourist/tourist-form', {
		title: 'Add tourist',
		errors: '',
		body: {},
		flights: []
	});
});

// Add tourist
router.post('/add', (req, res) => {
	const body = req.body;
	const touristData = new Tourists(body);
	const errors = touristData.validateSync();

	touristData.save(err => {
		if (err) {
			res.render('tourist/tourist-form', {
				title: 'Add tourist',
				errors,
				body: {},
				flights: []
			});
			return;
		}

		res.redirect('/tourists');
	});
});

// Delete tourist
router.get('/delete/:id', (req, res) => {
	Tourists.findByIdAndDelete(req.params.id, err => {
		res.redirect('/tourists');
	});
});

/* POST tourist form */
router.get('/update/:id', (req, res) => {
	Tourists.find({
		_id: req.params.id
	}, (err, data) => {
		Flights.find({}, (err, flights) => {
			res.render('tourist/tourist-update', {
				title: 'Edit tourist',
				data,
				flights
			});
		});
	});
});

// Delete tourist with flight
router.get('/update/:idTourist/delete/:id', (req, res) => {
	Flight.findById(req.params.id, (err, doc) => {
		Tourists.findByIdAndUpdate(req.params.idTourist, {
			$pull: {
				'flights': doc
			}
		}, err => {
			console.log(err);
			res.redirect(`/tourists/update/${req.params.idTourist}`);

		});
	});
});

// Update tourist (Add flight)
router.get('/update/:idTourist/add/:id', (req, res) => {
	Flights.findById(req.params.id, (err, doc) => {
		Tourists.findByIdAndUpdate(req.params.idTourist, {
			$push: {
				'flights': doc
			}
		}, err => {
			console.log(err);
			res.redirect(`/tourists/update/${req.params.idTourist}`);
		});
	});
});

module.exports = router;