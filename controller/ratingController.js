const Rating = require('../models/ratingSchema');

const addRating = async(req,res) =>{

    const{ rate, comment} = req.body;

    if(!rate || !comment){
        res.status(400)
        throw new Error("All fields are required")
    }

    try{
        const rating = await Rating.create({bus: req.params.bsid, user: req.user._id, comment, rate});

        if(!rating){
            res.status(404)
            throw new Error("Rating not added")
        }

        res.status(201).json({
            msg :"Rating added successfully",
            data: rating
        })
    }
    catch(err){
        res.status(500)
        throw new Error(err);
        console.log(err)
    }
}


const getRatings = async(req,res) =>{
    try{
        const getRatings = await Rating.find({bus: req.params.bsid}).populate("user").populate("bus");

        if(!getRatings){
            res.satus(404)
            throw new Error("No ratings found") 
        }

        res.status(200).json({
            msg:"All ratings fetched successfully",
            data: getRatings
        })
    }
    catch(err){
        res.status(500)
        throw new Error(err);
    }
}


module.exports = {addRating, getRatings}