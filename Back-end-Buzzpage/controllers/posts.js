const express = require('express');
const verifyToken = require('../middleware/verify-token.js');
const Post = require('../models/post.js');
const router = express.Router();

// ========== Public Routes ===========

// ========= Protected Routes =========

router.use(verifyToken);
// Need to create logic for COMMENTS
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

// update 

router.put('/:postId', async (req, res) => {
    try {
      // Find the post:
      const post = await Post.findById(req.params.postId);
  
      // Check permissions:
      if (!post.author.equals(req.user._id)) {
        return res.status(403).send("You're not allowed to do that!");
      }
  
      // Update Post:
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.postId,
        req.body,
        { new: true }
      );
  
      // Append req.user to the author property:
      updatedPost._doc.author = req.user;
  
      // Issue JSON response:
      res.status(200).json(updatedPost);
    } catch (error) {
      res.status(500).json(error);
    }
});


// delete

module.exports = router;