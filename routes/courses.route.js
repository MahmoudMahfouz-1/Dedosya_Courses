const express = require('express');
const router = express.Router();
const validationSchema = require('../middlewares/validationSchema');

const verifyToken = require('../middlewares/verifyToken');
const allowedTo = require('../middlewares/allowedTo');

const coursesController = require('../controllers/cources.controller');
const userRole = require('../utils/userRoles');

router
  .route('/')
  .get(coursesController.getAllCourses)
  .post(
    verifyToken,
    allowedTo(userRole.ADMIN, userRole.MANAGER),
    validationSchema(),
    coursesController.addCourse
  );

router
  .route('/:courseId')
  .get(coursesController.getSingleCourse)
  .patch(coursesController.editCourse)
  .delete(
    verifyToken,
    allowedTo(userRole.ADMIN, userRole.MANAGER),
    coursesController.deleteCourse
  );

module.exports = router;
