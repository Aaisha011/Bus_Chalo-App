const getBus = (req,res) =>{
    try{
        res.status(201).json({
            msg :"Bus fetched successfully"
        })
    }
    catch(err){
        throw new Error(err);
    }
}

const getAllBuses = (req,res) =>{
    try{
        res.status(200).json({
            msg :"All buses fetched successfully"
        })
    }
    catch(err){
        throw new Error(err);
    }
}


module.exports = {getBus, getAllBuses}