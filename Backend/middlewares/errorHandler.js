function errorHandlerMiddleware(error, req, res, next) {
    console.error("Error:", error.stack);

    res.status(error.status || 500).json({
        message: error.message || "Loi server vui long thu lai"
    });
}

module.exports = errorHandlerMiddleware;