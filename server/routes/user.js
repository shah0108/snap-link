const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const User = mongoose.model("User");
const Post = mongoose.model("Post");

router.get('/user/:id', requireLogin, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id }).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        
        const posts = await Post.find({ postedBy: req.params.id }).populate("postedBy", "_id name");
        res.json({ user, posts });
    } catch (err) {
        res.status(422).json({ error: err.message });
    }
});

router.put('/follow', requireLogin, async (req, res) => {
    try {
        const result = await User.findByIdAndUpdate(
            req.body.followId,
            { $push: { followers: req.user._id } },
            { new: true }
        );
        
        if (!result) {
            return res.status(422).json({ error: "User not found" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { $push: { following: req.body.followId } },
            { new: true }
        ).select("-password")

        res.json(updatedUser);
    } catch (err) {
        console.error("Error updating user:", err);
        res.status(422).json({ error: err.message });
    }
});

router.put('/unfollow', requireLogin, async (req, res) => {
    try {
        const result = await User.findByIdAndUpdate(
            req.body.unfollowId,
            { $pull: { followers: req.user._id } },
            { new: true }
        );
        
        if (!result) {
            return res.status(422).json({ error: "User not found" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { $pull: { following: req.body.unfollowId } },
            { new: true }
        ).select("-password")

        res.json(updatedUser);
    } catch (err) {
        console.error("Error updating user:", err);
        res.status(422).json({ error: err.message });
    }
});

router.put('/updatepic',requireLogin,(req,res)=>{
    User.findByIdAndUpdate(req.user._id,{pic:req.body.pic}),{new:true},
    (err,result)=>{
        if(err){
            return res.status(422).json({error:"pic cannot post"})
        }
        res.json(result)
    }
})


module.exports = router;
