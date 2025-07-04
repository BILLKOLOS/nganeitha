const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  status: { type: String, enum: ['active', 'inactive', 'canceled'], default: 'inactive' },
  plan: { type: String, enum: ['monthly', 'yearly'], default: 'monthly' },
  startDate: Date,
  endDate: Date
});

module.exports = mongoose.model('Subscription', subscriptionSchema); 