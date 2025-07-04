const mongoose = require('mongoose');

const ebookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  description: String,
  category: String,
  price: Number,
  originalPrice: Number,
  bestseller: Boolean,
  image: String,
}, { timestamps: true });

module.exports = mongoose.model('Ebook', ebookSchema); 