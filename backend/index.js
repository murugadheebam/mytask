const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors');
const bodyParser = require('body-parser');
var multer = require('multer');




const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: '*'
}));

mongoose.connect("mongodb://localhost:27017/mytask", {
  useNewUrlParser: "true",
})
mongoose.connection.on("error", err => {
  console.log("err", err)
})
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected")
})
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    console.log(file)
    const ext = file.mimetype.split("/")[1];
    if(file.fieldname =='category_image'){
      cb(null, `category-${file.fieldname}-${Date.now()}.${ext}`);
    }else{
      cb(null, `product-${file.fieldname}-${Date.now()}.${ext}`);
    }
  },
});
const uploadimage = multer({
  storage: multerStorage
});
var CourseRoutes = require('./routes/courseroute');
var StaffRoutes = require('./routes/staffroute');
var StudentRoutes = require('./routes/studentroute');

app.use('/course', CourseRoutes);
app.use('/staff', uploadimage.fields([{ name: 'profile', maxCount: 1 }]),StaffRoutes);
app.use('/student',uploadimage.fields([{ name: 'profile', maxCount: 1 }]),StudentRoutes);


app.listen(5000, () => {
    console.log("Server has started!")
})