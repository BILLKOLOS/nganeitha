const express = require('express');
const router = express.Router();
const ebookController = require('../controllers/ebookController');
const { requireAuth, requireAdmin } = require('../middleware/auth');

router.get('/', ebookController.getAllEbooks);
router.get('/:id', ebookController.getEbookById);
router.post('/', requireAuth, requireAdmin, ebookController.createEbook);
router.put('/:id', requireAuth, requireAdmin, ebookController.updateEbook);
router.delete('/:id', requireAuth, requireAdmin, ebookController.deleteEbook);

module.exports = router; 