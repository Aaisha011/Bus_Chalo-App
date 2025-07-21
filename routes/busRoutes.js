const express = require('express');
const { getAllBuses, getBus } = require('../controller/busController');

const router = express.Router();

router.get('/',getAllBuses);

router.get('/:bid',getBus);

module.exports = router;