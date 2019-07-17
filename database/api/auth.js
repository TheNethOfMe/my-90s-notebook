const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../utils/auth-middleware");

const User = require("../models/User");
const Profile = require("../models/Profile");

const loginDataIsValid = require("../utils/login-validation");

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    // let profile;
    // if (user.profile) {
    //   profile = await Profile.findById(user.pofile);
    // }
    res.json({ user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/auth
// @desc    Login user and get token
// @access  Public
router.post("/", async (req, res) => {
  const reject = { msg: "Invalid Credentials" };

  if (!loginDataIsValid(req.body)) {
    return res.status(400).json(reject);
  }

  const { email, password } = req.body;

  try {
    // Check that User Exists
    console.log(req.body);
    let user = await User.findOne({ email });
    let profile = null;
    if (!user) {
      console.log("No user");
      return res.status(400).json(reject);
    }
    if (user.profile) {
      profile = await Profile.findById(user.profile);
    }
    // Check that Passwords Match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("No match");
      return res.status(400).json(reject);
    }
    // Create Token
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
        res.status(200).json({ token, profile, user: payload.user });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
