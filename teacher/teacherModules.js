const teacher = require("./userSchema");
const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const keys = require("../key/key.json");
const JWT_KEY = keys.JWT_KEY;

//------------------------------- VIEW ALL -------------
async function showTeacher(req, res)  {
  teacher.find((err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
}

//-------------------------------------- ADD----------------------------------
async function addTeacher(req,res) {

  await teacher.find({
    teacherID: req.body.teacherID
  })
    .exec()
    .then(data => {
      if (data.length >= 1) {
        res.status(409).json({
          message: "Teacher already exists"
        });
      } else {
        const teachermodel = new teacher({
          _id: mongoose.Types.ObjectId(),
          teacherID: req.body.teacherID,
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          userType: "teacher"
        });

        teachermodel
          .save()
    }
});  
}
//-----------------------------LOGIN--------------------


async function login(req, res)  {
  //console.log(req.body.teacherID)
  await teacher.find({ teacherID: req.body.teacherID })
    .exec()
    .then(data => {
      console.log(data);
      if (data.length < 1) {
        return res.status(401).json({
          message: "Authorization Failed!"
        });
      }
      if (data) {
        //correct password
        const token = jwt.sign(
          {
            id: data[0]._id,
            teacherID: data[0].teacherID,
            userType: data[0].userType
          },
          JWT_KEY,
          {
            expiresIn: "1h"
          }
        );
        console.log(data);
        return res.status(200).json({
          message: "Authorization Success",
          token: token
        });
      }
      res.status(401).json({
        message: "Authorization Failed!"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}

//--------------------------------- UPDATE-------------------------------
async function updateTeacher(req, res)  {
  await teacher.findById(req.params.id, (err, data) => {
    if (!data) {
      res.status(404).send("data is not found");
    } else {
      (data.teacherID = req.body.teacherID), (data.name = req.body.name);
      data.mail = req.body.email;
      data.password = req.body.password;

      data
        .save()
        .then(data => {
          res.json("teacher updated");
        })
        .catch(err => {
          res.status(400).send("update not succesful");
        });
    }
  });
}

async function deleteTeacher(req, res) {
  teacher.findOneAndDelete({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.json("deleted successfully");
    }
  });
}

module.exports = {addTeacher,login,updateTeacher,deleteTeacher,showTeacher};