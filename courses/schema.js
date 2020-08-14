const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
  courseName: {
    type: String,
  },
  description: {
    type: String,
  },
  teacher: [
    {
      teacherID: {type:String}
    },
    {
     name: {type: String}
    },
    {
      email: { type: String },
    },
    {
      password:{type:String}
    }
  ],
  student:[
    {
      name: {type: String}
    },
    {
      email: {type: String}
    },
    {
      password: {type: String}
    }
  ],
   duration: {
    type: String,
  },
});

let teacherModel = mongoose.model("teacher", userSchema);
module.exports = teacherModel;