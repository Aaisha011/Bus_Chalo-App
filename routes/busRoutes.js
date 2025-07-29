const express = require('express');
const { getAllBuses, getBus } = require('../controller/busController');

const router = express.Router();

router.get('/',getAllBuses);

router.get('/:bsid',getBus);

module.exports = router;