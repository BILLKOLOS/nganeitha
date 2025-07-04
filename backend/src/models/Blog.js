const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: String,
  content: String,
  category: String,
  author: String,
  readTime: String,
  isPremium: { type: Boolean, default: false },
  image: String,
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema); 