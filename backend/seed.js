const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Blog = require('./src/models/Blog');
const Ebook = require('./src/models/Ebook');
const bcrypt = require('bcryptjs');
const User = require('./src/models/User');

dotenv.config();

const blogs = [
  {
    title: "The Ultimate Guide to Adaptogenic Herbs",
    excerpt: "Discover how adaptogenic herbs can help your body manage stress and boost energy naturally.",
    content: "Full article content here...",
    category: "Herbal",
    author: "Dr. Sarah Chen",
    readTime: "8 min",
    isPremium: true,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400"
  },
  {
    title: "Mindful Eating: Transform Your Relationship with Food",
    excerpt: "Learn practical techniques to develop a healthier, more conscious approach to eating and nutrition.",
    content: "Full article content here...",
    category: "Mindfulness",
    author: "Maya Johnson",
    readTime: "6 min",
    isPremium: false,
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400"
  }
];

const ebooks = [
  {
    title: "The Mindful Path to Wellness",
    author: "Dr. Jane Smith",
    description: "A comprehensive guide to mindfulness practices for holistic health and well-being.",
    category: "Mindfulness",
    price: 19.99,
    originalPrice: 29.99,
    bestseller: true,
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=400"
  },
  {
    title: "Herbal Remedies for Beginners",
    author: "Tom Martinez",
    description: "Learn how to use common herbs for natural healing and everyday wellness.",
    category: "Herbal",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=400"
  }
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  await Blog.deleteMany();
  await Ebook.deleteMany();
  await User.deleteMany();
  await Blog.insertMany(blogs);
  await Ebook.insertMany(ebooks);
  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  await User.create({ fullName: 'Admin User', email: 'admin@wellness.com', password: adminPassword, isAdmin: true });
  console.log('Database seeded!');
  mongoose.disconnect();
}

seed(); 