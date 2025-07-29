const User = require("../models/userSchema")
const Bus = require("../models/busSchema")
const Booking = require("../models/bookingSchema")

// Add Bus
const addBus = async (req, res) => {
    console.log(req.body);

    const {
        name,
        model,
        totalSeats,
        availableSeats,
        busType,
        pickupLocation,
        dropLocation,
        registration,
        arrivalTime,
        departureTime,
        fare
    } = req.body

    //  check if all fields are coming   
    if (
        !name ||
        !model ||
        !totalSeats ||
        !availableSeats ||
        !busType ||
        !pickupLocation ||
        !dropLocation ||
        !registration ||
        !arrivalTime ||
        !departureTime ||
        !fare
    ) {
        res.status(400)
        throw new Error("All fields are required")
    }

    // if bus already exists
    const busExists = await Bus.findOne({ registration })

    if (busExists) {
        res.status(400)
        throw new Error("Bus already exists")
    }

    try {
        const bus = await Bus.create({
            name,
            model,
            totalSeats,
            availableSeats,
            busType,
            pickupLocation,
            dropLocation,
            registration,
            arrivalTime,
            departureTime,
            fare
        })

        if (!bus) {
            res.status(500)
            throw new Error("Bus not created")
        }

        res.status(201).json({
            msg: "Bus added successfully",
            data: bus
        })
    }
    catch (err) {
        res.status(500)
        throw new Error("Creating bus failed")
    }
}

// Edit Bus
const updateBus = async (req, res) => {

    // console.log(req.params);
    try {
        const updatedBus = await Bus.findByIdAndUpdate(req.params.bsid, req.body, { new: true })

        if (!updatedBus) {
            res.status(404)
            throw new Error("Bus not found")
        }

        res.status(200).json({
            msg: "Bus has edited successfully",
            data: updatedBus
        })
    }
    catch (err) {
        res.status(500)
        throw new Error("Updating bus failed")
    }
}

//Get All Users
const getAllUsers = async (req, res) => {
    const users = await User.find();
    try {
        if (!users) {
            res.status(404).json({
                msg: "User not found"
            })
        }
        res.status(200).json({
            msg: "All users fetched successfully",
            body: users
        })
    }
    catch (err) {
        throw new Error(err);
    }
}

//Get All Ratings
const getAllRatings = (req, res) => {
    try {
        res.status(200).json({
            msg: "All ratings fetched successfully"
        })
    }
    catch (err) {
        throw new Error(err);
    }
}

//Get All Bookings
const getAllBookings = (req, res) => {
    try {
        res.status(200).json({
            msg: "All Bookings fetched successfully"
        })
    }
    catch (err) {
        throw new Error(err);
    }
}

//Update User
const updateUser = async (req, res) => {
    console.log(req.params.uid);

    try {
        const user = await User.findByIdAndUpdate(req.params.uid, req.body, { new: true });

        if (!user) {
            res.status(404).json
            throw new Error("User not found")
        }

        res.status(200).json({
            msg: "User has been updated successfully",
            data: user
        })
    }
    catch (err) {
        throw new Error(err);
    }
}

//Update Booking
const updateBooking = async (req, res) => {
    try {

        const booking = await Booking.findById(req.params.bid);
        console.log(booking);

        if (!booking) {
            throw new Error("Booking not found");
        }


        const bus = await Bus.findById(booking.bus);

        if(!bus){
            res.status(400)
            throw new Error("Bus not found");
        }
        
        const updatedBooking = await Booking.findByIdAndUpdate(req.params.bid, req.body, { new: true }).populate("user").populate("bus");
        if (!updatedBooking) {
            res.status(400)
            throw new Error("Booking not updated");
        }

        res.status(200).json({
            msg: "Booking has been updated successfully",
            data: updatedBooking
        })


        // Update bus seats 
        await Bus.findByIdAndUpdate(booking.bus, { availableSeats: bus.totalSeats - booking.ticketCount }, { new: true })

    }
    catch (err) {
        throw new Error(err);
    }
}


module.exports = {
    addBus,
    updateBus,
    getAllUsers,
    getAllRatings,
    getAllBookings,
    updateUser,
    updateBooking
}

