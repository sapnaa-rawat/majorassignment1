const teacher = require("../courses/schema");
const mongoose = require("mongoose");
var jwt = require("jsonwebtoken");

function authToken(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);

    var decode = jwt.verify(token, "shhhhh");
    console.log(decode._doc);
    next();
  } catch (err) {
    res.status(401).send("invalid token");
  }
}
//------------------------------- VIEW ALL -------------
async function showTeacher(req, res) {
  teacher.find((err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
}

//-------------------------------------- ADD----------------------------------
async function addTeacher(req, res) {
  await teacher
    .find({
      teacherID: req.body.teacherID,
    })
    .exec()
    .then((data) => {
      if (data.length >= 1) {
        res.status(409).json({
          message: "Teacher already exists",
        });
      } else {
        const teachermodel = new teacher({
          _id: mongoose.Types.ObjectId(),
          teacherID: req.body.teacherID,
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          userType: "teacher",
        });

        teachermodel.save();
      }
    });
}
//-----------------------------LOGIN--------------------

async function login(req, res) {
  //console.log(req.body.teacherID)
  await teacher
    .find({ teacherID: req.body.teacherID })
    .exec()
    .then((data) => {
      console.log(data);
      if (data.length < 1) {
        return res.status(401).json({
          message: "Authorization Failed!",
        });
      }
      if (data) {
        //correct password

        var token = jwt.sign({ ...data, _id: data._id.toString() }, "shhhhh", {
          expiresIn: "1h",
        });
        return res
          .status(200)
          .json({ message: "logged in sucessfully", token: token });
      }
      res.status(401).json({
        message: "Authorization Failed!",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
}

//--------------------------------- UPDATE-------------------------------
async function updateTeacher(req, res) {
  await teacher
    .findById(req.params.id)
    .exec()
    .then((data) => {
      console.log(data);
      if (data.length < 1) {
        return res.status(401).json({
          message: "Authorization Failed!",
        });
      }
      if (data) {
        //correct password

        var token = jwt.sign({ ...data, _id: data._id.toString() }, "shhhhh", {
          expiresIn: "1h",
        });
        return res
          .status(200)
          .json({ message: "logged in sucessfully", token: token });
      }
      (data.teacherID = req.body.teacherID), (data.name = req.body.name);
      data.mail = req.body.email;
      data.password = req.body.password;

      data
        .save()
        .then((data) => {
          res.json("teacher updated");
        })
        .catch((err) => {
          res.status(400).send("update not succesful");
        });
    });
}

async function deleteTeacher(req, res) {
  teacher
    .findOneAndDelete({ _id: req.params.id })
    .exec()
    .then((data) => {
      console.log(data);
      if (data.length < 1) {
        return res.status(401).json({
          message: "Authorization Failed!",
        });
      }
      if (data) {
        //correct password

        var token = jwt.sign({ ...data, _id: data._id.toString() }, "shhhhh", {
          expiresIn: "1h",
        });
        return res
          .status(200)
          .json({ message: "logged in sucessfully", token: token });
      }
      res.json("deleted successfully");
    });
}

module.exports = {
  addTeacher,
  login,
  updateTeacher,
  deleteTeacher,
  showTeacher,
  authToken,
};
