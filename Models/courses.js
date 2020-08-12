var mongoose = require('mongoose');

// Class schema

var courseSchema = mongoose.Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  instructor: {
    type: String
  },
  students:[{type:String}],
  test[{file,marks}]
});

var Class = module.exports = mongoose.model('Class', ClassSchema);
