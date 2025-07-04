const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const { requireAuth, requireAdmin } = require('../middleware/auth');

router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getBlogById);
router.post('/', requireAuth, requireAdmin, blogController.createBlog);
router.put('/:id', requireAuth, requireAdmin, blogController.updateBlog);
router.delete('/:id', requireAuth, requireAdmin, blogController.deleteBlog);

module.exports = router; 