const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { requireAuth } = require('../middleware/auth');

router.get('/purchases', requireAuth, userController.getPurchaseHistory);
router.get('/subscription', requireAuth, userController.getSubscription);
router.put('/subscription', requireAuth, userController.updateSubscription);

module.exports = router; 