const express = require('express');
const router = express.Router();
const student= require('../controllers/studentcontroller.js');
router.post('/create', student.create);
router.get('/getstudents', student.getstudents);
router.get('/getstudentsbyid', student.getstudentsbyid);
router.post('/update', student.update);


module.exports = router;