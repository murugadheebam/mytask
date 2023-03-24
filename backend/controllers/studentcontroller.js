const {Student} = require('../models/commonmodels');


exports.create = async (req,res) => {
   try{
    const { name, gender, dob, email ,mobileno,course} = req.body;
    var profile=req.files.profile[0].filename
    const student = await Student.create({
      name,
      gender,
      dob,
      email,
      mobileno,
      course,
      profile
    });
    res.status(201).json(student);
   }  
   catch(e){
    res.status(201).json(e);
   }
}
exports.update = async (req,res) => {
  try{
    Student.findOneAndUpdate({_id:req.body.data._id}, req.body.data, function (err, user) {
    if(user){
      res.status(201).json({status:"success"});
    }else{
      res.status(201).json({status:"failure"});

    }
  });
  
  }  
  catch(e){
  }
}

exports.getstudents = async (req,res) => {
  var students=await Student.find()
  res.status(201).json({status:"success",students:students});
 
}
exports.getstudentsbyid = async (req,res) => {
  var student=await Student.find({_id:req.query.id})
  res.status(201).json({status:"success",student:student});

}                                                                                                                                                    