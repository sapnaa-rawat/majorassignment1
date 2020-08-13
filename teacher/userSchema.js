const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  teacherID: {
    type: String,
    required: true,
  },

  name: {
    type: String,
  },

  email: {
    type: String,
  },

  password: {
    type: String,
  },

  userType: {
    type: String,
    required: true,
  },
});

const teachermodel = mongoose.model("teacher", schema);

module.exports = teachermodel;
