const mongoose = require("mongoose");
const validator = require('validator');

const userRole = require('../utils/userRoles');
userSchema = mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, 'Must be a valid Email']
    },
    password:{
        type: String,
        required: true,
    },
    token:{
        type: String
    },
    role:{
        type: String,
        enum: [userRole.ADMIN, userRole.MANAGER,userRole.USER],
        default: userRole.USER
    },
    avatar:{
        type: String,
        default: 'uploads/image.png'
    }
})

module.exports = mongoose.model("User", userSchema);
