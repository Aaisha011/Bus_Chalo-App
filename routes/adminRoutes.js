const express = require('express');

const router = express.Router();

const{addBus,updateBus,updateBooking,updateUser,getAllUsers,getAllRatings,getAllBookings} = require('../controller/adminController');

router.post('/bus',addBus);

router.put('/bus/:bsid',updateBus);
router.put('/user/:uid',updateUser);
router.put('/booking/:bid',updateBooking);

router.get('/get-users',getAllUsers);
router.get('/get-ratings',getAllRatings);
router.get('/get-bookings',getAllBookings);

module.exports = router;