const Bus = require('../models/busSchema');
const Booking = require("../models/bookingSchema");

// Add booking
const addBooking = async (req, res) => {

    // ticket count
    const { ticketCount } = req.body

    if (!ticketCount) {
        res.status(400)
        throw new Error("Ticket count is required");
    }

    // Bus availability
    const bus = await Bus.findById(req.params.bsid);

    if (!bus) {
        res.status(404)
        throw new Error("Bus not found");
    }

    console.log(bus.totalSeats);

    // seats availability

    if (bus.availableSeats === 0) {
        res.status(400)
        throw new error("No seats available");
    }

    // Add booking
    try {
        const booking = await Booking.create({
            user: req.user._id,
            bus: bus._id,
            ticketCount: ticketCount
        })

        if (!booking) {
            res.status(500)
            throw new Error("Booking Failed")
        }

        // Update bus seats 
        // await Bus.findByIdAndUpdate(req.params.bsid, { seats: bus.seats - ticketCount }, { new: true })

        res.status(201).json({
            msg: "Booking added successfully",
            data: booking
        })
    }
    catch (err) {
        res.status(500)
        throw new Error(err);
    }
}

// Get booking
const getBooking = async (req, res) => {
    console.log(req.params.bid);
    try {
        const getBooking = await Booking.findById(req.params.bid).populate("bus").populate("user");

        if (!getBooking) {
            res.status(404)
            throw new Error("Booking not found");
        }

        res.status(200).json({
            msg: "Booking fetched successfully",
            data: getBooking
        })
    }
    catch (err) {
        throw new Error(err);
    }
}

const cancelBooking = (req, res) => {
    try {
        res.status(200).json({
            msg: "Booking cancelled successfully"
        })
    }
    catch (err) {
        throw new Error(err);
    }
}

// Get all bookings
const getAllBookings = (req, res) => {

    // const bookings = await Booking.findById(req.params.uid).populate("bus").populate("user");

    // try {
    //     if (!bookings) {
    //         res.status(404)
    //         throw new Error("No bookings found");
    //     }

    //     res.status(200).json({
    //         msg: "All Bookings fetched successfully",
    //         data: bookings
    //     })
    // }
    // catch (err) {
    //     throw new Error(err);
    // }
    try{
        res.status(200).json({
            msg:"All Bookings fetched successfully"
        })
    }
    catch(err){
        throw new Error("No bookings found",err);   
    }
}

module.exports = {
    addBooking,
    getBooking,
    cancelBooking,
    getAllBookings
}