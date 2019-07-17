const express = require("express");
const router = express.Router();
const auth = require("../utils/auth-middleware");
const ObjectId = require("mongoose").mongo.ObjectID;

const Friend = require("../models/Friend");
const Profile = require("../models/Profile");

// @route   GET api/friends
// @desc    Get friends and requests of logged in user
// @access  Private
router.get("/", auth, async (req, res) => {
  const queryId = new ObjectId(req.user.id);
  try {
    const returnFriends = await Friend.aggregate([
      {
        $match: {
          $or: [
            { sentFrom: queryId },
            { $and: [{ sentTo: queryId }, { status: { $lt: 2 } }] }
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
        $project: {
          id: "$id",
          friendUserId: "$friendProfile.user",
          friendFirstName: "$friendProfile.firstName",
          friendLastName: "$friendProfile.lastName",
          friendBio: "$friendProfile.bio",
          status: {
            $switch: {
              branches: [
                {
                  case: { $eq: ["$status", 0] },
                  then: "mutual"
                },
                {
                  case: {
                    $and: [
                      { $eq: ["$status", 1] },
                      { $eq: ["$sentFrom", "$friendProfile.user"] }
                    ]
                  },
                  then: "recieved"
                }
              ],
              default: "sent"
            }
          }
        }
      }
    ]);
    return res.status(200).json({ friends: returnFriends });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/friends
// @desc    Creates a new friend request
// @access  Private
router.post("/", auth, async (req, res) => {
  console.log("FriendId", req.body.recipientId);
  const newFriendObject = {
    sentFrom: req.user.id,
    sentTo: req.body.recipientId,
    status: 1
  };
  try {
    const returnData = await Profile.findOne({ user: req.body.recipientId });
    console.log(returnData);
    if (!returnData) {
      return res
        .status(404)
        .json({ msg: "We couldn't find that user profile." });
    }
    const newFriend = new Friend(newFriendObject);
    await newFriend.save();
    const returnFriend = {
      friendUserId: req.body.recipientId,
      friendFirstName: returnData.firstName,
      friendLastName: returnData.lastName,
      friendNickName: returnData.nickName,
      friendBio: returnData.bio,
      status: "sent",
      id: newFriend._id
    };
    return res.status(201).json({ friend: returnFriend });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/friends/:id
// @desc    Updates a friend status
// @access  Private
router.put("/:id", auth, async (req, res) => {
  let updateParams = {};
  if (req.body.update === "accept") updateParams.status = 0;
  if (req.body.update === "delete") updateParams.status = 2;
  try {
    await Friend.findByIdAndUpdate(req.params.id, updateParams);
    return res.status(200).json({ msg: "Update Success" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/friends/:id
// @desc    Deletes a friend object
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    await Friend.findByIdAndDelete(req.params.id);
    return res.status(200).json({ msg: "Delete Successful" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
