const mongoose = require('mongoose');
const { Schema } = mongoose;


const questionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    pi : { type: String, required: true },
    bl: { type: Number, required: true },
    co: { type: Number, required: true },
    topic: { type: String, required: true },
    unit: { type: Number, required: true },
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    marks : { type: Number, required: true },
    chapter_id: { type: Schema.Types.ObjectId, ref: 'Chapter', required: true },
  });

module.exports = mongoose.model('Question', questionSchema);