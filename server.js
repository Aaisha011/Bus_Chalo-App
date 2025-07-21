const express = require('express');
const app = express();
const colors  = require('colors');  
const errorHandler = require("./middleware/errorHandler");

require('dotenv').config();

const connectDB = require('./config/dbConfig');

connectDB();

// middleware
app.use(express.json());
app.use(express.urlencoded());

const PORT = process.env.PORT || 5000;

app.get('/',(req,res) =>{
    res.status(200).json({
        msg :"Welcome to the BUS-CHALO API"
    })
})

// User Routes
app.use('/api/auth',require('./routes/authRoutes'));

// Admin Routes
app.use('/api/admin',require('./routes/adminRoutes'));

// Booking Routes
app.use('/api/booking',require('./routes/bookingRoutes'));

// Bus Routes
app.use('/api/bus',require('./routes/busRoutes'));

// Rating Routes
app.use('/api/rating',require('./routes/ratingRoutes'));

app.listen(PORT,() =>{
    console.log(`Server is running on PORT: ${PORT}`.bgMagenta);
})


// Error Handler
app.use(errorHandler)