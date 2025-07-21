const addBooking = (req,res) =>{
    try{
        res.status(201).json({
            msg :"Booking added successfully"
        })
    }
    catch(err){
        throw new Error(err);
    }
}

const getBooking = (req,res) =>{
    try{
        res.status(200).json({
            msg:"Booking fetched successfully"
        })
    }
    catch(err){
        throw new Error(err);
    }
}

const cancelBooking = (req,res) =>{
    try{
        res.status(200).json({
            msg :"Booking cancelled successfully"
        })
    }
    catch(err){
        throw new Error(err);
    }
}

const getAllBookings = (req,res) =>{
    try{
        res.status(200).json({
            msg :"All Bookings fetched successfully"
        })
    }
    catch(err){
        throw new Error(err);
    }
}

module.exports = {
    addBooking,
    getBooking,
    cancelBooking,
    getAllBookings
}