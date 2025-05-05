const notFoundMiddleware =(req,res,next)=>{
    console.log("not found");
    res.status(404).json({message:"not found"});
}

module.exports = notFoundMiddleware;