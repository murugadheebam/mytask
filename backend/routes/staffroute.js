const express = require('express');
const router = express.Router();
const staff = require('../controllers/staffcontroller.js');
router.post('/create', staff.create);
router.get('/getstaffs', staff.getstaffs);
router.get('/getstaffbyid', staff.getstaffbyid);
router.post('/update', staff.update);


module.exports = router;