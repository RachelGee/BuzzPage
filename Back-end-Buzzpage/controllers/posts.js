const express = require('express');
const verifyToken = require('../middleware/verify-token.js');
const Post = require('../models/post.js');
const router = express.Router();

// ========== Public Routes ===========

// ========= Protected Routes =========

router.use(verifyToken);

// create
router.post('/', async (req, res) => {
    try {
      req.body.author = req.user._id;
      const post = await Post.create(req.body);
      post._doc.author = req.user;
      res.status(201).json(post);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
});

// index to show all post "Hive Feed"
router.get('/', async (req, res) => {
    try {
      const posts = await Post.find({})
        .populate('author')
        .sort({ createdAt: 'desc' });
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json(error);
    }
});

// show post by id
router.get('/:postId', async (req, res) => {
    try {
      const post = await Post.findById(req.params.postId).populate([
        'author',
        'comments.author',
      ]);
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json(error);
    }
});

// delete

module.exports = router;