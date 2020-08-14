const courseModel = require("./courses");

var showCourse = (req, res) => {
  courseModel.find(function (err, course) {
    if (err) {
      console.log(err);
    } else {
      res.json(course);
    }
  });
};
var getById=(req,res)=>{
  let id = req.params.id;
  courseModel.findById(id, function(err, courses) {
    res.json(courses);
  });
};

  

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
getById
};