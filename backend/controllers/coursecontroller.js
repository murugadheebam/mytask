const {Course} = require('../models/commonmodels');


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
    console.log(req.body)
    const filter = { _id:req.body._id };
    const update = { name:req.body.name,description:req.body.description,fee:req.body.fee,duration:req.body.duration};
    await Course.findOneAndUpdate(filter, update).then((data)=>{
      if(data){
        res.status(201).json({status:"success"});
      }else{
        res.status(201).json({status:"failure"});

      }
    })
  }  
  catch(e){
    console.log(e)
  }
}

exports.getcourses = async (req,res) => {
  var courses=await Course.find({status : 0})
  res.status(201).json({status:"success",courses:courses});
 
}
exports.getcoursebyid = async (req,res) => {
  var course=await Course.find({_id:req.query.id})
  res.status(201).json({status:"success",course:course});

}   

exports.deletecourse = async (req,res) => {
  const filter = { _id: req.query.id };
  const update = { status:1 };
  await Course.findOneAndUpdate(filter, update).then((data) => {
    if (data) {
      res.status(201).json({ status: "success" });
    } else {
      res.status(400).json({ status: "failure" });

    }
  });

}  