const express = require('express');
const verifyToken = require('../middleware/verify-token.js');
const Post = require('../models/hoot.js');
const router = express.Router();

// ========== Public Routes ===========

// ========= Protected Routes =========

router.use(verifyToken);

// create

// index

// show by id

// delete