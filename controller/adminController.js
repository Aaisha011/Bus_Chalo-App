// Add Bus
const addBus = (req,res) =>{
    try{
        res.status(201).json({
            msg :"Bus added successfully"
        })
    }
    catch(err){
        res.status(500).json({
            msg:"Error in adding bus"
        })
    }
}

// Edit Bus
const updateBus = (req,res) =>{
    try{
        res.status(200).json({
            msg :"Bus has edited successfully"
        })
    }
    catch(err){
        res.status(500).json({
            msg:"Error in editing bus"
        })
    }
}

//Get All Users
const getAllUsers = (req,res) =>{
    try{
        res.status(200).json({
            msg :"All users fetched successfully"
        })
    }
    catch(err){
        throw new Error(err);   
    }
}



//Get All Ratings
const getAllRatings = (req,res) =>{
    try{
        res.status(200).json({
            msg :"All ratings fetched successfully"
        })
    }
    catch(err){
        throw new Error(err);   
    }
}

//Get All Bookings
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

//Update Users
const updateUser = (req,res) =>{
    try{
        res.status(200).json({
            msg :"User has been updated successfully"   
        })
    }
    catch(err){
        throw new Error(err);   
    }
}

//Update Booking
const updateBooking = (req,res) =>{
    try{
        res.status(200).json({
            msg :"Booking has been updated successfully"   
        })
    }
    catch(err){
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

