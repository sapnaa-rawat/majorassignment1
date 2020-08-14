var express = require('express');
var router = express.Router();
var teacher=require('../teacher/teacherModules')
var course=require('../courses/courseModules')
var assign=require('../assignment/assignment')
function validate(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  if (!email || !password) {
    return res.send("enter email or password");
  }
  next();
}

router.post('/registration', teacher.addTeacher);
router.get('/login',validate, teacher.login);
router.post('/upload',teacher.authToken, assign.uploadFile);
router.put('/update', teacher.authToken,teacher.updateTeacher);
router.delete('/delete',teacher.authToken, teacher.deleteTeacher);
router.get('/courses', course.showCourse);
router.put('/courses/update', course.updateCourse);
router.post('/courses/add', course.addCourse);
router.post('/courses/email', course.addByEmail);
router.delete('/courses/delete', course.deleteCourse);

module.exports = router;
