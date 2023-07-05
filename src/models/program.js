const mongoose = require('mongoose');
const Schema  = mongoose.Schema;


const programSchema = new Schema({
    // _id : { type: String, required: true },
    code : { type: String, required: true },
    name: { type: String, required: true }
  });

module.exports = mongoose.model('Program', programSchema);
