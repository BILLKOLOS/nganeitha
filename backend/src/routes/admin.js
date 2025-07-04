const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { requireAuth, requireAdmin } = require('../middleware/auth');

router.get('/users', requireAuth, requireAdmin, adminController.getAllUsers);
router.put('/user/role', requireAuth, requireAdmin, adminController.updateUserRole);
router.get('/purchases', requireAuth, requireAdmin, adminController.getAllPurchases);
router.get('/subscriptions', requireAuth, requireAdmin, adminController.getAllSubscriptions);

module.exports = router; 