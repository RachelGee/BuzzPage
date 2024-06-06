const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
    {
      text: {
        type: String,
        required: true
      },
      author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
      like: Number
    },
    { timestamps: true }
);

const postSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      photo:{
        type: String,
        default:""
      },
      category: {
        type: String,
        required: true,
        enum: ['Lifestyle', 'News', 'Sports', 'Games', 'Movies', 'Music', 'Television'],
      },
      author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      comments: [commentSchema],
      like: Number
    },
    { timestamps: true }
);
  

const Post = mongoose.model('Post', postSchema);

module.exports = Post;

