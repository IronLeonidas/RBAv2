function errorHandler(err, _, response, _){
    console.error("Unhandled error:", err);
    response.status(500).json({
        message: "Internal server error. Please try again later.",
        error: process.env.NODE_ENV !== "production" ? err.message : undefined
    });
}

function notFoundHandler(_, response, _){
    response.status(404).json({message: "Route not found"});
}

module.exports = {
    errorHandler,
    notFoundHandler
};