const express = require('express');
const router = express.Router();
const course = require('../controllers/coursecontroller.js');
router.post('/create', course.create);
router.get('/getcourses', course.getcourses);
router.get('/getcoursebyid', course.getcoursebyid);
router.post('/update', course.update);


module.exports = router;