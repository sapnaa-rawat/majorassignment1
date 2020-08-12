const teacher=require('../Models/teacher')
const course=require('../Models/courses')

function registerTeacher(req,res,next) {
    
    var data=req.body;
    const newTeacher= new teacher(data);
    newTeacher.save((err) => {
        if (err) {
          return res.status(401, err);
        }
        res.status(200).send(user);
      });
    }

  function login() {
  return async function (req, res, next) {
    const email = req.body.email;
    const pass = req.body.password;

    const user = await teacher.findOne({ email: email });
    if (!user) return res.status(404, { message: "user not found" });
    bcrypt.compare(pass, user.password, function (err, result) {
      if (err) {
        res.send(404, "incomplete data");
      }
      if (result == false) {
        return res.send("invalid credentials");
      } else {
        var token = jwt.sign({ ...user, _id: user._id.toString() }, "shhhhh", {
          expiresIn: "100000ms",
        });
        console.log(user._id);
        return res.status(200).send({ message: "You have logged in ", token: token });
      }
    });
  };
}
async function showTeacher(req, res) {
    let user = req.body;
    const userId = req.params.id;
    const response = await teacher.findById(userId, user);
    if (!response) {
        res.send(404, "user not found");
    }
     res.status(200).send(response);
  
  }
 async function showCourses(){
const response=await course.find();
return res.status(200).send(response);
}
async function addCourse(req,res,next){
  let user = req.body;
  const newUser = new course(user);
  newUser.save((err) => {
    if (err) {
      return res.status(401, err);
    }
    res.status(200).send(user);
  });
}

function updateCourse(req,res,next){
  const userId = req.params.id;
    let user = req.body;
    const response=await course.findByIdAndUpdate(userId, user, (err, data) => {
      if (err) {
        console.log(err);
        res.status(404,{message:'course not found'});
      }
      res.status(200).send(data);
    });
  }
function addStudent(){
var getId=req.params.id;
var 
}