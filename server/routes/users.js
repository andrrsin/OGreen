const User = require('../models/User');
const bcrypt = require('bcrypt');
const router = require('express').Router();
const Announcement = require('../models/Announcement');
const tokenManager = require('../middleware/jwt');
const Post = require('../models/Post');

//update user
router.patch("/:id",tokenManager.authenticateToken, async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(parseInt(process.env.SALT));
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json(err);
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("Account has been updated");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can update only your account!");
    }
});
//delete user
router.delete("/:id",tokenManager.authenticateToken, async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can delete only your account!");
    }
});


//get a user
router.get("/",tokenManager.authenticateToken, async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
        const user = userId
            ? await User.findById(userId)
            : await User.findOne({ username: username });
        const { password, updatedAt, ...other } = user._doc;
        res.status(200).json(other);
    } catch (err) {
        res.status(500).json(err);
    }
});
//follow a user
router.patch("/:id/follow",tokenManager.authenticateToken, async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } });
                await currentUser.updateOne({ $push: { followings: req.params.id } });
                res.status(200).json("User has been followed");
            } else {
                res.status(403).json("You already follow this user");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You can't follow yourself");
    }
});

//unfollow a user
router.patch("/:id/unfollow",tokenManager.authenticateToken, async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({ $pull: { followings: req.params.id } });
                res.status(200).json("user has been unfollowed");
            } else {
                res.status(403).json("you dont follow this user");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("you cant unfollow yourself");
    }
});

//Get User followers
router.get("/:id/followers",tokenManager.authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const followers = await Promise.all(
            user.followers.map((followerId) => {
                return User.findById(followerId);
            })
        );
        res.status(200).json(followers);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Get User following
router.get("/:id/following",tokenManager.authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const followings = await Promise.all(
            user.followings.map((followerId) => {
                return User.findById(followerId);
            })
        );
        res.status(200).json(followings);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Get announcements by User
router.get('/:id/announcements',tokenManager.authenticateToken, async (req, res) => {
    try {
        const userAnnouncements = await Announcement.find({ userId: req.params.id });
        res.status(200).json(userAnnouncements);
    } catch (err) {
        res.status(404).json(err);
    }
});

//Get User's All Posts
router.get("/posts/:username",tokenManager.authenticateToken, async (req, res) => {
    try {
        const currentUser = await User.findOne({ username: req.params.username });
        
        const userPost = await Post.find({ userId: currentUser._id });
        res.status(200).json(userPost)
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;