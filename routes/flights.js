const express = require('express');
const router = express.Router();

/* GET list of flights page. */
router.get('/', (req, res) => {
    res.render('flights', {
        title: 'List Flights'
    });
});

module.exports = router;