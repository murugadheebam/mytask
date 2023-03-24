const {Staff} = require('../models/commonmodels');


exports.create = async (req,res) => {
   try{
    // console.log(req.body.user)
    const { name, gender, dob, email ,mobileno,course} = req.body;
    var profile=req.files.profile[0].filename

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
   catch(e){
    res.status(201).json(e);
   }
}
exports.update = async (req,res) => {
  try{
    Staff.findOneAndUpdate({_id:req.body.data._id}, req.body.data, function (err, user) {
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

exports.getstaffs = async (req,res) => {
  var staff=await Staff.find()
  res.status(201).json({status:"success",staff:staff});
 
}
exports.getstaffbyid = async (req,res) => {
  var staff=await Staff.find({_id:req.query.id})
  res.status(201).json({status:"success",staff:staff});

}                                                                                                                                                    