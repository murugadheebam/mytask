const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  name: { type: String},
  description: { type: String},
  fee: { type: Number},
  duration: { type: Number},
});

const StaffSchema = new mongoose.Schema({
    name: { type: String},
    gender: { type: String},
    dob:{type : Date},
    email:{ type: String},
    mobileno:{ type: Number},
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'course' },
    profile: { type: String },


  
});

const StudentSchema = new mongoose.Schema({
    name: { type: String},
    gender: { type: String},
    dob:{type : Date},
    email:{ type: String},
    mobileno:{ type: Number},
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'course' },
    profile: { type: String },


});



module.exports = {
  Course: mongoose.model("course", CourseSchema),
  Staff: mongoose.model("staff", StaffSchema),
  Student: mongoose.model("student", StudentSchema),
};
