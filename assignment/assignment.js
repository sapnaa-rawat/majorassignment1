const student=require('../teacher/userSchema')
const course=require('../courses/courses')
const nodemailer=require('nodemailer')
const multer = require('multer');
//Sending an email
function mailer(req, res, next) {
    if(course.email===student.email){
      const output = `
    <p> You have a new assignment</p>
    <h3> Course Details </h3>
    <h3> Message : </h3>
    <p> If email and name is not yours please kindly inform to administrator, Thankyou </p>
    `;
    
      const email = student.email;
    
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
        subject: "You have a new assignment",
        text: "Hello",
        attachments:[
          {
            path: '/uploads'
          }
        ]
      };
    
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
    
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      });
    }
    else
    res.status(404).send('User not enrolled');
    }
    
//File upload
function uploadFile(req,res){
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "uploads/");
      },
      filename: function (req, file, cb) {
        cb(null, +"-" + file.originalname);
      },
    });
    
    var upload = multer({ storage: storage }).single("file");
    
    router.post("/upload", function (req, res) {
      upload(req, res, function (err) {
        if (!file.originalname.match(/\.(pdf)$/)) {
          req.fileValidationError = "Only pdf files are allowed!";
          return cb(new Error("Only pdf files are allowed!"), false);
        }
        if (err instanceof multer.MulterError) {
          return res.status(500).json(err);
        } else if (err) {
          return res.status(500).json(err);
        }
    
        res.json({
          success: true,
          message: "Assignment uploaded!",
        });
      });
    mailer();
    });
    }
function generatePassword() {
  var length = 8,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}


module.exports={uploadFile,
generatePassword
  ,mailer};