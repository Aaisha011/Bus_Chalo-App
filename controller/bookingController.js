const Bus = require("../models/busSchema");
const Booking = require("../models/bookingSchema");

// Add booking
const addBooking = async (req, res) => {
  // ticket count
  const { ticketCount } = req.body;

  if (!ticketCount) {
    res.status(400);
    throw new Error("Ticket count is required");
  }

  // Bus availability
  const bus = await Bus.findById(req.params.bsid);

  if (!bus) {
    res.status(404);
    throw new Error("Bus not found");
  }

  console.log(bus.totalSeats);

  // seats availability

  if (bus.availableSeats === 0) {
    res.status(400);
    throw new error("No seats available");
  }

  // Add booking
  try {
    const booking = await Booking.create({
      user: req.user._id,
      bus: bus._id,
      ticketCount: ticketCount,
    });

    if (!booking) {
      res.status(500);
      throw new Error("Booking Failed");
    }

    // Update bus seats
    // await Bus.findByIdAndUpdate(req.params.bsid, { seats: bus.seats - ticketCount }, { new: true })

    res.status(201).json({
      msg: "Booking added successfully",
      data: booking,
    });
  } catch (err) {
    res.status(500);
    throw new Error(err);
  }
};

// Get booking
const getBooking = async (req, res) => {
  console.log(req.params.bid);
  try {
    const getBooking = await Booking.findById(req.params.bid)
      .populate("bus")
      .populate("user");

    if (!getBooking) {
      res.status(404);
      throw new Error("Booking not found");
    }

    res.status(200).json({
      msg: "Booking fetched successfully",
      data: getBooking,
    });
  } catch (err) {
    throw new Error(err);
  }
};


// 
const cancelBooking = async(req, res) => {
  try{
    const booking = await Booking.findById(req.params.bid)

    if(!booking){
        res.status(404)
        throw new Error("Booking not found")    
    }

    if(booking.status === "accepted"){
        res.status(400)
        throw new Error("Cannot cancel accepted booking")   
    }

    const canceledBooking = await Booking.findByIdAndDelete(req.params.bid, {status: "cancelled"}, {new: true}).populate("bus").populate("user")    
    if(!canceledBooking){
        res.status(404)
        throw new Error("Booking not found")
    }

    res.status(200).json({
        msg:"Booking cancelled successfully"
    })
  }
  catch(err){
    throw new Error(err)
  }
};

// Get My All Bookings
const getMyAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate("bus");

    res.status(200).json({
      msg: "All bookings fetched successfully",
      data: bookings,
    });
  } catch (err) {
    res.status(500).json({
      msg: "Failed to fetch bookings",
      error: err.message,
    });
  }
};


module.exports = {
  addBooking,
  getBooking,
  cancelBooking,
  getMyAllBookings,
};
