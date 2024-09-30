const express = require('express');
const mongoose = require("mongoose");
const path = require('path');   
const cors = require('cors'); // TO enable the APIs to work from any origin 
require('dotenv').config();

const httpStatusText = require('./utils/httpStatusText')
const coursesRouter = require('./routes/courses.route');
const usersRouter = require('./routes/users.route');

const url = process.env.MONGODB_URL;
mongoose.connect(url).then(() => {
    console.log("mongodb server started");
});

let app = express();
app.use('/uploads',express.static(path.join(__dirname,'uploads')))
app.use(cors());
app.use(express.json());
app.use('/api/courses', coursesRouter);
app.use('/api/users', usersRouter);
app.all('*', (req,res) =>
{
    return res.json({status: httpStatusText.ERROR, message: "This Resource isn't available"});
});

app.use((error, req, res, next) =>
{
    res.status(error.statusCode || 500).json({status: error.statusText || httpStatusText.ERROR, message: error.message }); 
});



app.listen(process.env.PORT, ()=> {
    console.log(`Listing on port ${process.env.PORT}`);
});