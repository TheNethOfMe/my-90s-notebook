const express = require("express");
const router = express.Router();
const auth = require("../utils/auth-middleware");

const Profile = require("../models/Profile");
const User = require("../models/User");

const profileDataErrors = require("../utils/profile-validators");
const profileSearchValidator = require("../utils/profile-search");

// @route   GET api/profile
// @desc    Get Own Profile
// @access  Private
// router.get("/", auth, async (req, res) => {
//   try {
//     const profile = await Profile.findOne({ user: req.user.id });
//     res.status(200).json(profile);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

// @route   POST api/profile
// @desc    Create Own Profile
// @access  Private
// router.post("/", auth, async (req, res) => {
//   const { email, firstName, lastName, nickName, bio } = req.body;
//   const profileData = {};
//   profileData.user = req.user.id;
//   profileData.email = email || "";
//   profileData.firstName = firstName || "";
//   profileData.lastName = lastName || "";
//   profileData.nickName = nickName || "";
//   profileData.bio = bio || "";
//   try {
//     // Check for errors in the data the user passed in
//     const dataErrors = profileDataErrors(profileData);
//     if (!!dataErrors.length) {
//       res.status(400).json({ errors: dataErrors });
//     }
//     // Create new profile object and save it to db
//     const newProfile = new Profile(profileData);

//     await newProfile.save();
//     // Update the user object to indicate user has profile
//     await User.findByIdAndUpdate(profileData.user, {
//       $set: { profile: newProfile._id }
//     });

//     return res.status(201).json({ profileData });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

// @route   PUT api/profiles
// @desc    Updaate Own Profile
// @access  Private
router.put("/", auth, async (req, res) => {
  const { firstName, lastName, nickName, bio, theme } = req.body;
  const profileData = {};
  profileData.user = req.user.id;
  profileData.firstName = firstName || "";
  profileData.lastName = lastName || "";
  profileData.nickName = nickName || "";
  profileData.bio = bio || "";
  profileData.theme = theme || "paper-cup";
  try {
    let profile = await Profile.findOne({ user: profileData.user });
    if (!profile)
      return res.status(400).json({ msg: "Can't find your profile." });
    const profileErrors = profileDataErrors(profileData);
    if (!!profileErrors.length) {
      res.status(400).json({ errors: profileErrors });
    }
    profile = await Profile.findOneAndUpdate(
      { user: profileData.user },
      { $set: profileData },
      { new: true }
    );
    res.status(202).json({ profileData });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// ROUTE  GET api/profiles/search?
// DESC   Gets profiles by first, last, and nickname search
// ACCESS Private
router.get("/search", auth, async (req, res) => {
  const searchFields = profileSearchValidator(req.query);
  if (searchFields.count < 2) {
    return res
      .status(404)
      .json({ msg: "You need to enter at least two name fields." });
  }
  const { searchFirstName, searchLastName, searchNickName } = searchFields;
  try {
    const searchResults = await Profile.aggregate([
      {
        $match: {
          $or: [
            {
              $and: [
                { firstName: { $regex: searchFirstName, $options: "i" } },
                { nickName: { $regex: searchNickName, $options: "i" } }
              ]
            },
            {
              $and: [
                { nickName: { $regex: searchNickName, $options: "i" } },
                { lastName: { $regex: searchLastName, $options: "i" } }
              ]
            },
            {
              $and: [
                { lastName: { $regex: searchLastName, $options: "i" } },
                { firstName: { $regex: searchFirstName, $options: "i" } }
              ]
            }
          ]
        }
      },
      {
        $addFields: {
          exact: {
            $allElementsTrue: [
              [
                { $eq: ["$firstName", searchFirstName] },
                { $eq: ["$nickName", searchNickName] },
                { $eq: ["$lastName", searchLastName] }
              ]
            ]
          }
        }
      },
      {
        $sort: {
          exact: -1
        }
      },
      {
        $project: {
          exact: 0
        }
      }
    ]);
    return res.status(200).json({ searchResults });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// ROUTE  GET api/profiles/email?email=test@test.com
// DESC   Gets a User Profile by email address
// ACCESS Private
router.get("/email", auth, async (req, res) => {
  try {
    const profileFoundByEmail = await Profile.findOne({
      email: req.query.email
    });
    if (!profileFoundByEmail) {
      return res.status(404).json({ msg: "No user found." });
    }
    return res.status(200).json({ profileFoundByEmail });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
