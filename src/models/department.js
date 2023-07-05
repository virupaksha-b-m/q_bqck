const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const departmentSchema = new Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
    program_id: {type: Schema.Types.ObjectId, ref: 'Program', required: true }
  });


  module.exports = mongoose.model('Department', departmentSchema);