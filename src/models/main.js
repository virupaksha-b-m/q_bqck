const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for a program
const programSchema = new mongoose.Schema({
  _id : { type: String, required: true },
  name: { type: String, required: true }
});

// Define the schema for a department
const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // code: { type: String, required: true },
  program_id: { type: Schema.Types.ObjectId, ref: 'Program', required: true },
});

// Define the schema for a course
const courseSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  department_id: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
  faculty_id: { type: Schema.Types.ObjectId, ref: 'Faculty', required: true },
});

// Define the schema for a chapter
const chapterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // code: { type: String, required: true },
  course_id: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
});

// Define the schema for a question
const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  pi : { type: String, required: true },
  bl: { type: String, required: true },
  co: { type: String, required: true },
  marks : { type: int, required: true },

  chapter_id: { type: Schema.Types.ObjectId, ref: 'Chapter', required: true },
//   faculty_id: { type: Schema.Types.ObjectId, ref: 'Faculty', required: true },
});

// Define the schema for a faculty
const facultySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  department_id: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
});

// Export the schema models
const Program = mongoose.model('Program', programSchema);
const Department = mongoose.model('Department', departmentSchema);
const Course = mongoose.model('Course', courseSchema);
const Chapter = mongoose.model('Chapter', chapterSchema);
const Question = mongoose.model('Question', questionSchema);
const Faculty = mongoose.model('Faculty', facultySchema);

module.exports = { Program, Department, Course, Chapter, Question, Faculty };
