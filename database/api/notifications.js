const express = require("express");
const router = express.Router();
const auth = require("../utils/auth-middleware");

const Notification = require("../models/Notfication");

// @route   GET api/notification
// @desc    Gets all of a user's notifications
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const notes = await Notification.find({
      notificationFor: req.user.id
    }).sort({ createdAt: -1 });

    return res.status(200).json({ notes });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/notification/:id
// @desc    Deletes a notification
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    return res.status(200).json({ msg: "Delete Successful" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
