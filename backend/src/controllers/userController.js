const Purchase = require('../models/Purchase');
const Subscription = require('../models/Subscription');

exports.getPurchaseHistory = async (req, res) => {
  try {
    const purchases = await Purchase.find({ user: req.user._id }).sort({ date: -1 });
    res.json(purchases);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getSubscription = async (req, res) => {
  try {
    let sub = await Subscription.findOne({ user: req.user._id });
    if (!sub) sub = await Subscription.create({ user: req.user._id });
    res.json(sub);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateSubscription = async (req, res) => {
  try {
    const { status, plan, endDate } = req.body;
    let sub = await Subscription.findOneAndUpdate(
      { user: req.user._id },
      { status, plan, endDate },
      { new: true, upsert: true }
    );
    res.json(sub);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}; 