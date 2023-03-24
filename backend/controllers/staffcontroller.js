const Staff = require('../models/commonmodels.js');


exports.create = async (req,res) => {
   try{
    // console.log(req.body.user)
    const { username, email, mobileno, password ,userrole} = req.body.user;
    console.log(username);
    console.log(email)
    const user = await Staff.create({
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
  var users=await Staff.find()
  res.status(201).json({status:"success",users:users});
 
}
exports.getstaffbyid = async (req,res) => {
  var users=await Staff.find({_id:req.query.id})
  res.status(201).json({status:"success",users:users});

}                                                                                                                                                    