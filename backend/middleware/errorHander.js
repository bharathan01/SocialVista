
const httpStatusCodes = require("../utils/httpStatusCodes");

const errorHandle = (error, req, res, next) => {
    const status  = "FAILD"
    const statusCode = error.statusCode || httpStatusCodes.INTERNAL_SERVER_ERROR
    const message = error.message
    const details = error.details || null 
    
    res.status(statusCode).json({
        status,
        message,
        details
    })
};

module.exports = errorHandle