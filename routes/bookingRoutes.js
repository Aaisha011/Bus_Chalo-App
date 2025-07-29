const express =require('express');
const { addBooking, cancelBooking, getAllBookings, getBooking} = require('../controller/bookingController');

const router = express.Router();
const protect = require('../middleware/authMiddleware');

router.post('/:bsid', protect, addBooking);

router.get('/:bid', protect, getBooking);

router.get('/my-bookings', protect, getAllBookings);

router.delete('/:bid', protect, cancelBooking);

module.exports = router;