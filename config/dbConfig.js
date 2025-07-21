const mongoose = require("mongoose");
const colors = require("colors");   

const connectDB = async() =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected : ${conn.connection.host}`.bgGreen.white);
    }
    catch(err){
        console.log(`Error in MongoDB Connection : ${err.message}`.bgRed.black);
    }
}

module.exports = connectDB;