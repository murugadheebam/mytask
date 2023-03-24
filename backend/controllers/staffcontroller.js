const { Staff } = require('../models/commonmodels');


exports.create = async (req, res) => {
  try {
    // console.log(req.body.user)
    const { name, gender, dob, email, mobileno, course } = req.body;
    var profile = req.files.profile[0].filename

    const staff = await Staff.create({
      name,
      gender,
      dob,
      email,
      mobileno,
      course,
      profile
    });
    res.status(201).json(staff);
  }
  catch (e) {
    res.status(201).json(e);
  }
}
exports.update = async (req, res) => {
  try {
    var profile = req.files.profile
    var staff = await Staff.findOne({ _id: req.body._id })
    var profile_image = profile ? req.files.profile[0].filename : staff.profile;

    const filter = { _id: req.body._id };
    const update = { name: req.body.name, gender: req.body.gender, email: req.body.email, mobileno: req.body.mobileno, dob: req.body.dob, course: req.body.course, profile: profile_image };
    await Staff.findOneAndUpdate(filter, update).then((data) => {
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

exports.getstaffs = async (req, res) => {
  var staff = await Staff.find({status : 0})
  res.status(201).json({ status: "success", staff: staff });

}
exports.getstaffbyid = async (req, res) => {
  var staff = await Staff.find({ _id: req.query.id })
  res.status(201).json({ status: "success", staff: staff });

}

exports.deletestaff = async (req, res) => {
  const filter = { _id: req.query.id };
  const update = { status: 1 };

  await Staff.findOneAndUpdate(filter, update).then((data) => {
    if (data) {
      res.status(201).json({ status: "success" });
    } else {
      res.status(400).json({ status: "failure" });
    }
  })
  .catch(error => console.log(error))

} 