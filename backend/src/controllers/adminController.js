const User = require('../models/User');
const Purchase = require('../models/Purchase');
const Subscription = require('../models/Subscription');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update user role (promote/demote admin)
exports.updateUserRole = async (req, res) => {
  try {
    const { userId, isAdmin } = req.body;
    const user = await User.findByIdAndUpdate(userId, { isAdmin }, { new: true, select: '-password' });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all purchases
exports.getAllPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find().populate('user', 'fullName email');
    res.json(purchases);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all subscriptions
exports.getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find().populate('user', 'fullName email');
    res.json(subscriptions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 