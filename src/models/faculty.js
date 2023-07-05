const mongoose = require('mongoose');
const { Schema } = mongoose;

const facultySchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    courses: [{ type: String, required: true }],
    department_id: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
  });

 module.exports =  mongoose.model('Faculty', facultySchema);
 