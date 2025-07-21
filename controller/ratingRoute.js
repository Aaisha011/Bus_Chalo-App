const addRating = (req,res) =>{
    try{
        res.status(201).json({
            msg :"Rating added successfully"
        })
    }
    catch(err){
        throw new Error(err);
    }
}


const getRatings = (req,res) =>{
    try{
        res.status(200).json({
            msg :"Get rating successfully"
        })
    }
    catch(err){
        throw new Error(err);   
    }
}


module.exports = {addRating, getRatings}