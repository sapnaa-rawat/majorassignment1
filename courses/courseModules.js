const courseModel = require("./courses");
const mailer=require('../assignment/assignment')
const nodemailer=require('nodemailer')
var mailToUser=(req,res)=>{
  var pass=mailer.generatePassword();    
  const output = `
    <p> You have a new courset</p>
    <h3> Your Details </h3>
    <ul> 
    <li>  Email : ${req.params.name} </li>
    <li> Password : ${pass} </li>
    </ul>
    <h3> Message : </h3>
    <p> If email and name is not yours please kindly inform to administrator, Thank you </p>
    `;
    
      const email = req.params.name;
    
      let transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "ankitprasad073@gmail.com",
          pass: "ankit123#",
        },
        tls: {
          rejectUnauthorized: false,
        },
     });
    
      let mailOptions = {
        from: '"Ankit" <ankitprasad073@gmail.com>',
        to: email,
        subject: "You have been allocated a new course",
        text: "Hello",
        html: output,
      };
    
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
    
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      });
    }
  

var showCourse = (req, res) => {
  courseModel.find(function (err, course) {
    if (err) {
      console.log(err);
    } else {
      res.json(course);
    }
  });
};
var addByEmail=(req,res)=>{
  let email=req.params.name;
  let user=new courseModel(email);
  user.save().then((user)=>{
     
      res.status(200).json({ course: "Student added successfully" });
    })
    .catch((err) => {
      res.status(400).send("Adding new student failed");
    });  
mailToUser();  
}

var addCourse = (req, res) => {
  let course = new courseModel(req.body);
  course
    .save()
    .then((course) => {
      res.status(200).json({ course: "Course added successfully" });
    })
    .catch((err) => {
      res.status(400).send("Adding new course failed");
    });
};


var updateCourse = (req, res) => {
  courseModel.findById(req.params.id, function (err, coursemodel) {
    if (!coursemodel) res.status(404).send("Data is not found");
    else coursemodel.courseName = req.body.courseName;
    coursemodel.description = req.body.description;
    coursemodel.instructorName = req.body.instructorName;
    coursemodel.startDate = req.body.startDate;
    coursemodel.duration = req.body.duration;
    coursemodel.email = req.body.email;

    coursemodel
      .save()
      .then((coursemodel) => {
        res.json("Course Updated");
      })
      .catch((err) => {
        res.status(400).send("Update not possible");
      });
  });
};

var deleteCourse = (req, res) => {
  courseModel.findOneAndDelete({ _id: req.params.id }, function (err) {
    if (err) res.json(err);
    else res.json("Successfully removed");
  });
};

module.exports = {
  deleteCourse,
  addCourse,
  updateCourse,
  showCourse,
addByEmail
};
