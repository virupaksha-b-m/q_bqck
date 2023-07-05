const mongoose = require('mongoose');
const { Schema } = mongoose;


const paperFormatSchema = new mongoose.Schema({
    ISA: { type: Number, required: true },
    question_code: [{ 
        PI : { type: String, required: true },
        CO : { type: Number, required: true },
    }],
    course_id: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    setter: { type: String, required: true },
  });

module.exports = mongoose.model('PaperFormat', paperFormatSchema);
 
