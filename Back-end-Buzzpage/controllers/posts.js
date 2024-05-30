const express = require('express');
const verifyToken = require('../middleware/verify-token.js');
const Post = require('../models/post.js');
const router = express.Router();

// ========== Public Routes ===========

// ========= Protected Routes =========

router.use(verifyToken);
// Need to create logic for COMMENTS
// create post return created post
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

// index to show all post "Hive Feed" return all posts
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

// show post by id and return post by id
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

// update post by ID return updated post by ID

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


// delete post by ID and return deleted post

router.delete('/:postId', async (req, res) => {
    try {
      const post = await Post.findById(req.params.postId);
  
      if (!post.author.equals(req.user._id)) {
        return res.status(403).send("You're not allowed to do that!");
      }
  
      const deletedPost = await Post.findByIdAndDelete(req.params.postId);
      res.status(200).json(deletedPost);
    } catch (error) {
      res.status(500).json(error);
    }
});

//create a commet
router.post('/:postId/comments', async (req, res) => {
  try {
    req.body.author = req.user._id;
    req.body.post = req.params.postId;
    const posts = await Post.findById(req.params.postId);
    posts.comments.push(req.body);
    await posts.save();
    // Find the newly created comment:
    const newComment = posts.comments[posts.comments.length - 1];
    newComment._doc.author = req.user;
    // Respond with the newComment:
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json(error);
  }
});

//update a comment
router.put('/:postId/comments/:commentId', async (req, res) => {
  try {
    req.body.author = req.user._id;
    req.body.post = req.params.postId;
    const post = await Post.findById(req.params.postId);
    const comment = post.comments.id(req.params.commentId);
    comment.text = req.body.text;
    await post.save();
    res.status(200).json({ message: 'Ok' });
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a comment

module.exports = router;