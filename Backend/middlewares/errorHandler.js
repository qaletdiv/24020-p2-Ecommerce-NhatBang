function errorHandlerMiddleware  (error , req , res, next) {
    console.log(`Error : ${error.stalk}`);
    res.status(err.status || 500).json({
        message: err.message || "Loi server vui long thu lai"
    });
    
}
module.exports = errorHandlerMiddleware