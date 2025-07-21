const express =require('express');
const { addBooking, cancelBooking, getAllBookings, getBooking} = require('../controller/bookingController');

const router = express.Router();

router.post('/',addBooking);

router.get('/:bid',getBooking);

router.get('/my-bookings',getAllBookings);

router.delete('/:bid',cancelBooking);

module.exports = router;