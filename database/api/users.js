const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../utils/auth-middleware");
// const ObjectId = require("mongoose").mongo.ObjectID;

const User = require("../models/User");
// all other models for delete route
const Profile = require("../models/Profile");
const Friend = require("../models/Friend");
const Post = require("../models/Post");
const Notification = require("../models/Notfication");

const registerDataErrors = require("../utils/register-validation");
const registerProfileErrors = require("../utils/profile-validators");

// @route   POST api/users
// @desc    register a user
// @access  public
router.post("/", async (req, res) => {
  const { userData, profileData } = req.body;
  const errors = registerProfileErrors(profileData).concat(
    registerDataErrors(userData)
  );
  if (!!errors.length) {
    return res.status(400).json({ errors });
  }
  const { email, password } = userData;
  try {
    let user = await User.findOne({ email });

    if (!!user) {
      res.status(400).json({ msg: "User already exists." });
    }
    user = new User({ email, password });
    const profile = new Profile(profileData);
    const newMessage = `Welcome, ${profile.firstName}! Nice to have you here!`;
    const note = new Notification({
      notificationFor: user._id,
      message: newMessage
    });

    user.profile = profile._id;
    profile.user = user._id;

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    await profile.save();
    await note.save();
    const payload = {
      user: { id: user.id, email: user.email }
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      {
        expiresIn: 10800
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user: payload.user, profile });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/users
// @desc    Update's a user's theme
// @access  Private
router.put("/", auth, async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.user.id,
      { $set: { theme: req.body.newTheme } },
      { new: true }
    );
    res.status(201).json({ msg: "Theme Updated" });
  } catch (err) {
    console.log(err);
  }
});

// @route   DELETE api/users
// @desc    deletes the user and their data
// @access  Private
router.delete("/", auth, async (req, res) => {
  const user = req.user.id;
  try {
    await Profile.findOneAndDelete({ user });
    await Friend.deleteMany({ $or: [{ sentTo: user }, { sentFrom: user }] });
    await Post.deleteMany({ createdBy: user });
    await Notification.deleteMany({ notificationFor: user });
    await User.findByIdAndDelete(user);
    res.status(200).json({ msg: "We're sorry to see you go." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
