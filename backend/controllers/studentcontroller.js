const { Student } = require('../models/commonmodels');
const { Course } = require('../models/commonmodels');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'murugadheebam@gmail.com',
    pass: 'jiufxrvqmoyixtem'
  }
});


exports.create = async (req, res) => {
  try {
    const { name, gender, dob, email, mobileno, course } = req.body;
    var profile = req.files.profile[0].filename
    await Student.create({
      name,
      gender,
      dob,
      email,
      mobileno,
      course,
      profile
    }).then(async (data)=>{
      var course_data=await Course.findById({_id:data.course})
      var mailOptions = {
        from: 'murugadheebam@gmail.com',
        to: data.email,
        subject: 'New Registration',
        html: `<p>Hi ${data.name}, this is to notify you that we have updated your details successfully for the ${course_data.name} course.THANK YOU.</p>`
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      res.status(201).json(data);


    })
  }
  catch (e) {
    console.log(e)
    res.status(201).json(e);
  }
}
exports.update = async (req, res) => {
  try {
    // console.log(req.body)
    var profile = req.files.profile
    var student = await Student.findOne({ _id: req.body._id })
    var profile_image = profile ? req.files.profile[0].filename : student.profile;

    const filter = { _id: req.body._id };
    const update = { name: req.body.name, gender: req.body.gender, email: req.body.email, mobileno: req.body.mobileno, dob: req.body.dob, course: req.body.course, profile: profile_image };

    await Student.findOneAndUpdate(filter, update).then((data) => {
      if (data) {
        res.status(201).json({ status: "success" });
      } else {
        res.status(201).json({ status: "failure" });

      }
    });

  }
  catch (e) {
  }
}

exports.getstudents = async (req, res) => {
  var students = await Student.find({status : 0})
  res.status(201).json({ status: "success", students: students });

}
exports.getstudentsbyid = async (req, res) => {
  var student = await Student.find({ _id: req.query.id })
  res.status(201).json({ status: "success", student: student });

}  

exports.deletestudent = async (req,res) => {
  const filter = { _id: req.query.id };
  const update = { status:1 };
  await Student.findOneAndUpdate(filter, update).then((data) => {
    if (data) {
      res.status(201).json({ status: "success" });
    } else {
      res.status(400).json({ status: "failure" });

    }
  });

}   