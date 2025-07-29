const express = require('express');

const router = express.Router();

const{addBus,updateBus,updateBooking,updateUser,getAllUsers,getAllRatings,getAllBookings} = require('../controller/adminController');
const adminProtect = require('../middleware/adminMiddleware');

router.post('/bus', adminProtect, addBus);

router.put('/bus/:bsid', adminProtect, updateBus);
router.put('/user/:uid', adminProtect, updateUser);
router.put('/booking/:bid', adminProtect, updateBooking);

router.get('/get-users', adminProtect, getAllUsers);
router.get('/get-ratings', adminProtect, getAllRatings);
router.get('/get-bookings', adminProtect, getAllBookings);

module.exports = router;