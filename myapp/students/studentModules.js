
const StudentModel = require("./studentSchema");
const mongoose=require('mongoose');

const checkAuth = require("../auth/checkAuthStudent");

const jwt = require("jsonwebtoken");
const keys = require("../key/key.json");
const JWT_KEY = keys.JWT_KEY;

// Receive data  and write to a file
/*function post("/download") (req, res) {
    // Do whatever with the data
    // Write it to a file etc...
});

// Return the generated file for download
app.get("/download", function (req, res) {
    // Resolve the file path etc... 
    res.download("./myapp/downloads");
});*/


//Get all student details
 function showStudent(req, res) {
  StudentModel.find(function(err, student) {
    if (err) {
      console.log(err);
    } else {
      res.json(student);
    }
  })
}

 function showStudentById(req, res) {
  let id = req.params.id;
  StudentModel.findById(id, function(err, students) {
    res.json(students);
  })
}

//Add new student to db
 function addNewStudent(req, res) {
   let student = new studentModel(req.body);
   student
    .save()
    .then(student => {
      res.status(200).json({ student : "student added successfully" });

     })
    .catch(err => {
      res.status(400).send("Adding new student failed");
    });

  StudentModel
    .find({
        studentID: req.body.studentID
    })
    .exec()
    .then(student => {
      if (student.length >= 1) {
        res.status(409).json({
          message: "Student already exists"
        });
      } else {
        const studentModel = new StudentModel({
          _id: mongoose.Types.ObjectId(),        
          studentName: req.body.studentName,
          studentID: req.body.studentID,
          email: req.body.email,
          password: req.body.password,
          nic: req.body.nic,
          course: req.body.course,
          userType: "student"
        });

        studentModel
          .save()
          .then(result => {
            console.log(result);
            res.status(201).json({
              message: "student added",
              createdStudent: result
            });
          })
          .catch(err => {
            console.log(err.message);
            res.status(500).json({
              error: err
            });
          })
        };
    })
  }
//-----------------------------LOGIN--------------------

function loginStudent(req, res) {

	console.log(req.body.studentID)
	Studentmodel.find({studentID:req.body.studentID})
	.exec()
	.then(student=>{
		console.log(student)
		if(student.length<1){
			return res.status(401).json({
				message:'Authorization Failed!'
			});
		}
		if(student){
		   //correct password
			const token=jwt.sign({
				   id:student[0]._id,
				   studentID:student[0].studentID,
				   userType:student[0].userType
  
			},
			JWT_KEY,
			{
				 expiresIn: "1h"
		  });
			console.log(student);
			 return res.status(200).json({
				message:'Authorization Success',
				token:token
			 });
		}
		res.status(401).json({
			message:'Authorization Failed!'
		});
	}).catch(err=>{
	console.log(err);
	res.status(500).json({
		error:err
	});
  })
  }
  
	
  //Update the student details
  function updateStudent(req, res) {
	StudentModel.findById(req.params.id, function(err, studentmodel) {
	  if (!studentmodel) res.status(404).send("Data is not found");
	  else 
	  studentmodel.studentName = req.body.studentName;
	  studentmodel.studentID = req.body.studentID;
  
	  studentmodel.email = req.body.email;
	  studentmodel.password = req.body.password;
	  studentmodel.nic = req.body.nic;
	  studentmodel.course = req.body.course;
	  studentmodel
		.save()
		.then(studentmodel => {
		  res.json("student Updated");
		})
		.catch(err => {
		  res.status(400).send("Update not possible");
		})
	  });
	
	}
  
  
  
  
  // Delete the student
  function deleteStudent(req, res) {
	StudentModel.findOneAndDelete({ _id: req.params.id }, function(err,studentmodel ) {
	  if (err) res.json(err);
	  else res.json("Successfully removed");
	});
  }
  
module.exports = {
    showStudentById,
    showStudent,
    addNewStudent,
    loginStudent,
     updateStudent,
    deleteStudent

};