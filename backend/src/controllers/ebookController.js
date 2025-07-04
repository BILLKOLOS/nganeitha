const Ebook = require('../models/Ebook');

exports.getAllEbooks = async (req, res) => {
  try {
    const ebooks = await Ebook.find().sort({ createdAt: -1 });
    res.json(ebooks);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getEbookById = async (req, res) => {
  try {
    const ebook = await Ebook.findById(req.params.id);
    if (!ebook) return res.status(404).json({ message: 'Ebook not found' });
    res.json(ebook);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createEbook = async (req, res) => {
  try {
    const ebook = new Ebook(req.body);
    await ebook.save();
    res.status(201).json(ebook);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateEbook = async (req, res) => {
  try {
    const ebook = await Ebook.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!ebook) return res.status(404).json({ message: 'Ebook not found' });
    res.json(ebook);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteEbook = async (req, res) => {
  try {
    const ebook = await Ebook.findByIdAndDelete(req.params.id);
    if (!ebook) return res.status(404).json({ message: 'Ebook not found' });
    res.json({ message: 'Ebook deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}; 