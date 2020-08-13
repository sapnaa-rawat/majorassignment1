var express = require('express');
var router = express.Router();
var teacher=require('../teacher/teacherRoutes')
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
function authToken  (req, res, next)  {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if(token == null){ return res.send(401)};
  jwt.verify(token, 'shhhhh', (err, user) => {
      if(err) {return res.send(403)}
      if(req.body.name === user.name){
      req.user = user;
      next();
  }
  else {
      res.send(401, {
          message: "Unauthorized access"
      });
  }
  })
}
router.get('/registration/teacher', teacher.showTeacher);
router.get('/registration/login',validate, teacher.showTeacher);
router.post('/registration/teacher/add',authToken, teacher.addTeacher);
router.post('/registration/teacher/upload',authToken, assign.uploadFile);
router.put('/registration/teacher/update', authToken,teacher.updateTeacher);
router.delete('/registration/teacher/delete',authToken, teacher.deleteTeacher);
router.get('/courses', course.showCourse);
router.put('/courses/update', course.updateCourse);
router.post('/courses/add', course.addCourse);
router.post('/courses/email', course.addByEmail);
router.delete('/courses/delete', course.deleteCourse);

module.exports = router;
