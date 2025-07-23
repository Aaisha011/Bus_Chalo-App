const express = require('express');

const router = express.Router();

const{registerUser, loginUser, privateController} = require('../controller/authController');
const protect = require('../middleware/authMiddleware');
router.post('/register',registerUser);

router.post('/login',loginUser);

router.post('/private', protect, privateController);

module.exports = router;