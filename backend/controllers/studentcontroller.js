const Student = require('../models/commonmodels.js');


exports.create = async (req,res) => {
   try{
    // console.log(req.body.user)
    const { username, email, mobileno, password ,userrole} = req.body.user;
    console.log(username);
    console.log(email)
    const user = await Student.create({
        username,
        email,
        mobileno,
        password,
        userrole,
      });
    res.status(201).json(user);
   }  
   catch(e){
    res.status(201).json(user);
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
  var users=await Student.find()
  res.status(201).json({status:"success",users:users});
 
}
exports.getstudentsbyid = async (req,res) => {
  var users=await Student.find({_id:req.query.id})
  res.status(201).json({status:"success",users:users});

}                                                                                                                                                    