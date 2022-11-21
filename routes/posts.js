const router = require('express').Router();
const User = require('../models/User');
const Post = require('../models/Post');
const Event = require('../models/Event');
const Comment = require('../models/Comment');

//Create Post
router.post('/', async (req, res) => {
    const newPost = new Post(req.body);
    try {
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  });
//Update Post
router.put('/:id', async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.userId === req.body.userId || req.body.isAdmin) {
  
        await post.updateOne({ $set: req.body });
        res.status(200).json("Post updated successfully");
  
      } else {
        res.status(403).json("You can update only your Posts!");
      }
    } catch (err) {
      res.status(404).json("Post not found!");
    }
  });


//Delete Post
router.delete('/:id', async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.userId === req.body.userId || req.body.isAdmin) {
  
        await post.deleteOne({ $set: req.body });
        res.status(200).json("Post deleted successfully");
  
      } else {
        res.status(403).json("You can delete only your Post!");
      }
    } catch (err) {
      res.status(404).json("Post not found!");
    }
  });

//Like/Dislike a Post

//Comment on a Post

//Get a Post

//Get Timeline Posts

//Get User's All Posts


module.exports = router;