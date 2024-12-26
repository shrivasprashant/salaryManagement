const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema({
  labourId: { type:Number, required: true },
  date: { type: Date, required: true },
  checkInTime: { type: String, required: true },
  checkOutTime: { type: String },
  totalHours: { type: Number },
  overtimeHours: { type: Number },
  lunchDeducted: { type: Boolean, default: false },
  salary: { type: Number },
  status: { type: String, enum: ['approved', 'disapproved', 'paid'], default: 'disapproved' },
});

module.exports = mongoose.model('Salary', salarySchema);
