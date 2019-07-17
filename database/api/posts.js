const express = require("express");
const router = express.Router();
const auth = require("../utils/auth-middleware");
const ObjectId = require("mongoose").mongo.ObjectID;

const Post = require("../models/Post");
const Friends = require("../models/Friend");

// @route   GET api/posts
// @desc    Gets user's own posts
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const myPosts = await Post.find({ createdBy: req.user.id });
    return res.status(200).json({ posts: myPosts });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/posts
// @desc    Creates a new post
// @access  Private
router.post("/", auth, async (req, res) => {
  try {
    const newPost = new Post({
      createdBy: req.user.id,
      content: req.body.content,
      color: req.body.color
    });
    await newPost.save();
    res.status(201).json({ msg: "Post created." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/posts/:id
// @desc    Updates a user's post
// @access  Private
router.put("/:id", auth, async (req, res) => {
  let updateParams = {};
  if (req.body.content) updateParams.content = req.body.content;
  if (req.body.color) updateParams.color = req.body.color;
  try {
    await Post.findByIdAndUpdate(req.params.id, updateParams);
    return res.status(200).json({ msg: "Update Success" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/posts/:id
// @desc    Deletes a user's post
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Delete Success" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/posts/friends
// @desc    Gets all user's friends posts
// @access  Private
router.get("/friends", auth, async (req, res) => {
  const queryId = new ObjectId(req.user.id);
  try {
    const friendPosts = await Friends.aggregate([
      {
        $match: {
          $or: [
            { $and: [{ sentTo: queryId }, { status: 0 }] },
            { $and: [{ sentFrom: queryId }, { status: 0 }] }
          ]
        }
      },
      {
        $addFields: {
          getProfile: {
            $cond: {
              if: { $eq: ["$sentFrom", queryId] },
              then: "$sentTo",
              else: "$sentFrom"
            }
          }
        }
      },
      {
        $lookup: {
          from: "profiles",
          localField: "getProfile",
          foreignField: "user",
          as: "friendProfile"
        }
      },
      {
        $unwind: "$friendProfile"
      },
      {
        $lookup: {
          from: "posts",
          localField: "friendProfile.user",
          foreignField: "createdBy",
          as: "friendPost"
        }
      },
      {
        $unwind: "$friendPost"
      },
      {
        $project: {
          postUserFirst: "$friendProfile.firstName",
          postUserLast: "$friendProfile.lastName",
          postUserNick: "$friendProfile.nickName",
          postColor: "$friendPost.color",
          postcontent: "$friendPost.content",
          postData: "$friendPost.createdAt"
        }
      }
    ]);
    return res.status(200).json({ posts: friendPosts });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
