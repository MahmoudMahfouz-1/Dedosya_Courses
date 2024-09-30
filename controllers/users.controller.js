const appError = require('../utils/appError');
const asyncWrapper = require('../middlewares/asyncWrapper');
const httpStatusText = require('../utils/httpStatusText');
const User = require('../models/user.model');
const generateJWT = require('../utils/generateJWT');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const getAllUsers = asyncWrapper(async (req,res) => {
    // Pigination Process
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const skip = (page - 1) * limit;

    
    const users = await User.find({}, {__v:false,_id: false, password: false}).limit(limit).skip(skip);
    res.status(200).json({status: httpStatusText.SUCCESS, data: {users}});
    });


const register = asyncWrapper(async(req,res, next) => {
    const {firstName, lastName, email, password, role} = req.body;
    
    const oldUser = await User.findOne({email: email});
    if(oldUser)
    {
        const error = appError.create("user already exists", 400, httpStatusText.FAIL);
        return next(error);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
        avatar: req.file.filename
    });

    // Generating JWT(Json Web Token) Token 
    const token = await generateJWT({email:newUser.email, id: newUser._id, role: newUser.role});
    newUser.token = token;
    
    await newUser.save();
    return res.status(201).json({status: httpStatusText.SUCCESS, data: {user: newUser}});
    
});


const login = asyncWrapper(async(req,res,next) => {
    const {email,password} = req.body;
    if(!email || !password) {
        const error = appError.create("Email or password is missing", 400, httpStatusText.ERROR);
        return next(error);
    }
    const user = await User.findOne({email:email});
    if(!user){
        const error = appError.create("User isn't found", 400, httpStatusText.FAIL);
        return next(error);
    }

    const result = await bcrypt.compare(password,user.password);
    if(user && result){
        const token = await generateJWT({email:user.email, id: user._id, role: user.role});  
        return res.status(200).json({status: httpStatusText.SUCCESS, data: {token}});
    } else {
        const error = appError.create("Password is incorrect", 400, httpStatusText.FAIL);
        return next(error);
    }
});



module.exports = {
    getAllUsers,
    register,
    login
}

