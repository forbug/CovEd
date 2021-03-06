const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema({
  firebase_uid: String,
  name: String,
  phone: String,
  email: String,
  timezone: String,
  bio: String,
  subjects: [String],
  school: String,
  major: String,
  class_year: String,
  // these are currently not coming from client
  college_prep: Boolean,
  languages_spoken: [String],
  grade_levels_to_mentor: [Number],
  mentees: [mongoose.Types.ObjectId],
  public: Boolean,
  last_request: Date,
  tags: [String],
});

// compile model from schema
module.exports = mongoose.model("mentor", mentorSchema);
