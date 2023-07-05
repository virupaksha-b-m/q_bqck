const mongoose = require('mongoose');
const { Schema } = mongoose;


const chapterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    unit: { type: Number, required: true },
    topic: [{ type: String, required: true }],
    course_id: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  });

module.exports = mongoose.model('Chapter', chapterSchema);
 
