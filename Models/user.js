var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');


var UserSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String,
    bcrypt: true
  },
  role: {  // If it is an instructor or a student
    type: String
  }
});

var User = module.exports = mongoose.model('User', UserSchema);
