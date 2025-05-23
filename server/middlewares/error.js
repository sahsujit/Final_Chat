const errorMiddleware = (err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
};


const TryCatch = (passedfunction) => async(req, res, next)=>{
    try {
        await passedfunction(req, res, next)
    } catch (error) {
        next(error)
    }
}

export { errorMiddleware, TryCatch };