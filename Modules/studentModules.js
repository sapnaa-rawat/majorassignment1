getStudentByUsername = function(username, callback) {
    var query = {username: username};
    Student.findOne(query, callback);
  }
  
  // Register a student for a class
  register = function(info, callback) {
    student_username = info['student_username'];
    class_id = info['class_id'];
    class_title = info['class_title'];
  
    var query = {username: student_username};
    Student.findOneAndUpdate(
      query,
      // Append the values to an array - push classes inside the instructor collection
      {$push: {"classes": {class_id: class_id, class_title: class_title}}},
      // Creates a new document if no documents match the filter or update
      {safe: true, upsert: true},
      callback
    );
  }