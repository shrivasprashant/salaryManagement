const mongoose = require('mongoose');

const labourSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  jobRole: { type: String },
});

module.exports = mongoose.model('Labour', labourSchema);
