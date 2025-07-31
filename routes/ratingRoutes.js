const express = require('express');
const { getRatings, addRating } = require('../controller/ratingController');

const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/:bsid',getRatings);

router.post('/:bsid', protect, addRating);

module.exports = router;    