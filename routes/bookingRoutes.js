const express =require('express');
const { addBooking, cancelBooking, getMyAllBookings, getBooking} = require('../controller/bookingController');

const router = express.Router();
const protect = require('../middleware/authMiddleware');

router.get('/my-bookings', protect, getMyAllBookings);

router.post('/:bsid', protect, addBooking);

router.get('/:bid', protect, getBooking);

router.delete('/:bid', protect, cancelBooking);

module.exports = router;