const express = require('express');
const router = express.Router();

/* GET list of tourists page. */
router.get('/', (req, res) => {
    res.render('tourists', {
        title: 'List Tourists'
    });
});

module.exports = router;