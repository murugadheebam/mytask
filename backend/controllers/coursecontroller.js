const Course = require('../models/commonmodels');


exports.create = async (req,res) => {
   try{
    console.log(req.body)
    const { name, description, fee, duration} = req.body;
    const course = await Course.create({
      name,
      description,
      fee,
      duration
    });
    console.log(course)

    res.status(201).json(course);
   }  
   catch(e){
    console.log(e)
    res.status(201).json(e);
   }
}
exports.update = async (req,res) => {
  try{
   User.findOneAndUpdate({_id:req.body.data._id}, req.body.data, function (err, user) {
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

exports.getcourses = async (req,res) => {
  var users=await User.find()
  res.status(201).json({status:"success",users:users});
 
}
exports.getcoursebyid = async (req,res) => {
  var users=await User.find({_id:req.query.id})
  res.status(201).json({status:"success",users:users});

}                                                                                                                                                    