function generatePassword() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}
var pass=generatePassword();

//Sending an email to the Instructor
function mailer(req,res,next){
const output = `
<p> You have a new course request</p>
<h3> Course Details </h3>
<ul> 
  <li> Password : ${pass} </li>
  <li> Student Email : ${req.body.studentEmail} </li>
</ul>
<h3> Message : </h3>
<p> If email and name is not yours please kindly inform to administrator, Thankyou </p>
`;

const email = req.body.studentEmail;

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
service: "gmail",
port: 587,
secure: false, // true for 465, false for other ports
auth: {
user: "testjahrin@gmail.com", // generated ethereal user
pass: "jahrin@123" // generated ethereal password
},
tls: {
rejectUnauthorized: false
}
});

// setup email data with unicode symbols
let mailOptions = {
from: '"BRIGHTNERD 👻" <testjahrin@gmail.com>', // sender address
to: email, // // list of receivers
subject: "New Course Allocation Request✔", // Subject line
text: "Hello world?", // plain text body
html: output // html body
};

transporter.sendMail(mailOptions, (error, info) => {
if (error) {
return console.log(error);
}

console.log("Message sent: %s", info.messageId);
console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
});
}