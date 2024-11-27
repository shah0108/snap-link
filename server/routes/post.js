const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require('../middleware/requireLogin');
const Post = mongoose.model("Post");

// Get all posts
router.get('/allpost', requireLogin, (req, res) => {
    Post.find()
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id name")
        .then(posts => {
            res.json({ posts });
        })
        .catch(err => {
            console.log(err);
        });
});

router.get('/getsubpost', requireLogin, (req, res) => {
    Post.find({postedBy:{$in:req.user.following}})
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id name")
        .then(posts => {
            res.json({ posts });
        })
        .catch(err => {
            console.log(err);
        });
});

// Create a new post
router.post('/createpost', requireLogin, (req, res) => {
    const { title, body, pic } = req.body;
    if (!title || !body || !pic) {
        return res.status(422).json({ error: "Please add all the fields" });
    }
    req.user.password = undefined;
    const post = new Post({
        title,
        body,
        photo: pic,
        postedBy: req.user
    });
    post.save()
        .then(result => {
            res.json({ post: result });
        })
        .catch(err => {
            console.log(err);
        });
});

// Get posts by logged-in user
router.get('/mypost', requireLogin, (req, res) => {
    Post.find({ postedBy: req.user._id })
        .populate("postedBy", "_id name")
        .then(mypost => {
            res.json({ mypost });
        })
        .catch(err => {
            console.log(err);
        });
});

// Like a post
router.put('/like', requireLogin, async (req, res) => {
    try {
        const result = await Post.findByIdAndUpdate(req.body.postId, {
            $push: { likes: req.user._id }
        }, {
            new: true
        })
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id name")
        .exec();
        res.json(result);
    } catch (err) {
        res.status(422).json({ error: err });
    }
});

// Unlike a post
router.put('/unlike', requireLogin, async (req, res) => {
    try {
        const result = await Post.findByIdAndUpdate(req.body.postId, {
            $pull: { likes: req.user._id }
        }, {
            new: true
        })
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id name")
        .exec();
        res.json(result);
    } catch (err) {
        res.status(422).json({ error: err });
    }
});

// Comment on a post
router.put('/comment', requireLogin, async (req, res) => {
    try {
        const comment = {
            text: req.body.text,
            postedBy: req.user._id
        };
        const result = await Post.findByIdAndUpdate(req.body.postId, {
            $push: { comments: comment }
        }, {
            new: true
        })
        .populate("comments.postedBy", "_id name")
        .populate("postedBy", "_id name")
        .exec();
        res.json(result);
    } catch (err) {
        res.status(422).json({ error: err });
    }
});

router.delete('/deletepost/:postId', requireLogin, async (req, res) => {
    try {
        console.log("Attempting to delete post with ID:", req.params.postId);
        
        const post = await Post.findOne({ _id: req.params.postId }).populate("postedBy", "_id");
        
        if (!post) {
            return res.status(422).json({ error: "Post not found" });
        }
        console.log("Post owner ID:", post.postedBy._id.toString());
        console.log("Logged-in user ID:", req.user._id.toString());
        if (post.postedBy._id.toString() === req.user._id.toString()) {
            const result = await Post.findByIdAndDelete(req.params.postId);
            return res.json({ message: "Post deleted successfully", post: result });
        } else {
            return res.status(403).json({ error: "Unauthorized" });
        }
    } catch (err) {
        console.error("Error in deleting post:", err);
        return res.status(500).json({ error: "Server error", details: err.message });
    }
});



module.exports = router;
