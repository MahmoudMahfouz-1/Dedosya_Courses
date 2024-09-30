const appError = require("../utils/appError");


const allowedTo = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.currentUser.role))
        {
            return next(appError.create("This role isn't autorized",401));
        }
        next();
    }
    
};

module.exports = allowedTo ;