const errorHandler = (err,req,res,next) =>{

    // console.log("Status code: ",res.statusCode);
    const resCode = res.statusCode <= 200 ? 500 : res.statusCode;   
    res.statusCode = resCode;

    res.json({
        msg : err.message,
        //For on which line this error occured 
        stack : process.env.NODE_ENV === "production" ? null : err.stack 
    })
}

module.exports = errorHandler;