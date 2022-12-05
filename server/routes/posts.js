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
router.patch('/:id', async (req, res) => {
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
router.patch("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
    }
  } catch (err) {
    res.status(404).json("Post not found!");
  }
});
//Comment on a Post
router.patch("/:id/comment", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const content = { postId: req.params.id, userId: req.body.userId, message: req.body.message };
    const newComment = new Comment(content);
    const savedComment = await newComment.save();
    await post.updateOne({ $push: { comments: savedComment._id.toString() } });
    res.status(200).json(savedComment);
  } catch (err) {
    res.status(404).json("Post not found!");
  }
});

//Modify a Comment
router.patch("/:id/comment/:commentId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const comment = await Comment.findById(req.params.commentId);
    if (comment.userId === req.body.userId || req.body.isAdmin) {
      await comment.updateOne({ $set: req.body });
      res.status(200).json("Comment updated successfully");
    } else {
      res.status(403).json("You can update only your comment!");
    }
  } catch (err) {
    res.status(404).json("Post not found!");
  }
});

//Delete a Comment
router.delete("/:id/comment/:commentId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const comment = await Comment.findById(req.params.commentId);
    if (comment.userId === req.body.userId || req.body.isAdmin) {
      await comment.deleteOne({ $set: req.body });
      res.status(200).json("Comment deleted successfully");
    } else {
      res.status(403).json("You can delete only your comment!");
    }
  } catch (err) {
    res.status(404).json("Post not found!");
  }
});

//Like a comment
router.patch("/:id/comment/:commentId/like", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment.likes.includes(req.body.userId)) {
      await comment.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The comment has been liked");
    } else {
      await comment.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The comment has been disliked");
    }
  } catch (err) {
    res.status(404).json("Post not found!");
  }
});

//Get a Post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json(err);
  }
});

//Get Timeline Posts
router.get("/timeline/all", async (req, res) => {
  try {

    const currentUser = await User.findById(req.body.userId);

    const userPost = await Post.find({ userId: currentUser._id });

    const friendPost = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPost.concat(...friendPost))
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get User's All Posts
router.get("/timeline/user", async (req, res) => {
  try {

    const currentUser = await User.findById(req.body.userId);

    const userPost = await Post.find({ userId: currentUser._id });
    res.status(200).json(userPost)
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;