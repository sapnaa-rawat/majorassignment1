var express = require('express');
var router = express.Router();
var teacher=require('../teacher/teacherModules')
var course=require('../courses/courseModules')
var assign=require('../assignment/assignment')
var auth=require('../teacher/teacherModules')
function validate(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  if (!email || !password) {
    return res.send("enter email or password");
  }
  next();
}

router.get('/registration', teacher.showTeacher);
router.get('/login',validate, teacher.showTeacher);
router.post('/add', teacher.addTeacher);
router.post('/upload',auth.authToken, assign.uploadFile);
router.put('/update', auth.authToken,teacher.updateTeacher);
router.delete('/delete',auth.authToken, teacher.deleteTeacher);
router.get('/courses', course.showCourse);
router.put('/courses/update', course.updateCourse);
router.post('/courses/add', course.addCourse);
router.post('/courses/email', course.addByEmail);
router.delete('/courses/delete', course.deleteCourse);

module.exports = router;
