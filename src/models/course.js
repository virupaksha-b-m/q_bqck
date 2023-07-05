const mongoose = require('mongoose');
const { Schema } = mongoose;


const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
    sem: { type: Number, required: true },
    department_id: { type: Schema.Types.ObjectId, ref: 'Department', required: true }
  });

module.exports = mongoose.model('Course', courseSchema);

