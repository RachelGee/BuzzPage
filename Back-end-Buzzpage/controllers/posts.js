const express = require('express');
const verifyToken = require('../middleware/verify-token.js');
const Post = require('../models/hoot.js');
const router = express.Router();

// ========== Public Routes ===========

// ========= Protected Routes =========

router.use(verifyToken);

// create
router.post('/posts', async (req, res) => {
    try {
        req.body.author = req.user._id;
        const post = await Post.create(req.body);
        post._doc.author = req.user;
        res.status(201).json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})
// index

// show by id

// delete