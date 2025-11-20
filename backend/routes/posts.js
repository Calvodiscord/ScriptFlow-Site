// backend/routes/posts.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { createPost, getFeedPosts, likePost } = require('../controllers/postController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Pasta temporária para uploads

// @route   POST api/posts
// @desc    Criar um post
router.post('/', auth, upload.single('image'), createPost);

// @route   GET api/posts/feed
// @desc    Obter posts do feed
router.get('/feed', auth, getFeedPosts);

// @route   PUT api/posts/:id/like
// @desc    Curtir/descurtir um post
router.put('/:id/like', auth, likePost);

module.exports = router;
