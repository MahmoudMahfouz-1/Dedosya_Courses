const express = require('express');
const router = express.Router();
const multer  = require('multer');

const diskStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads')
	},
	filename: function (req, file, cb) {
		const ext = file.mimetype.split('/')[1];
		const fileName = `user-${Date.now()}.${ext}`;
		cb(null, fileName)
	}
})
const fileFilter = (req, file, cb) => {
	// The function should call `cb` with a boolean
	// to indicate if the file should be accepted
	if(file.mimetype.split('/')[0] === "image")
	{
		cb(null, true)
	} else {	
		cb(appError.create(`Can only upload Images`,401, "You are not uploading an image"), false)
	}

}

const upload = multer({ 
	storage: diskStorage,
	fileFilter
});


const usersController = require('../controllers/users.controller');
const verifyToken = require('../middlewares/verifyToken'); 
const appError = require('../utils/appError');
router.route('/')
	.get(verifyToken, usersController.getAllUsers);

router.route('/register')
	.post(upload.single('avatar'),usersController.register);

router.route('/login')
	.post(usersController.login);



module.exports = router;