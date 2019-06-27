const express = require('express');
const Tourists = require('../models/tourists');

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
		body: {}
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
				body
			});
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
		res.render('tourist/tourist-update', {
			title: 'Edit tourist',
			data
		});
	});
});

// Update tourist
router.post('/update/:id', (req, res) => {
	const body = req.body;

	const touristData = new Tourists(body);

	touristData.save(err => {
		if (err) {
			res.render('tourist/tourist-update', {
				title: 'Edit flight',
				body
			});
		}

		res.redirect('/tourists');
	});
});

module.exports = router;