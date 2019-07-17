const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  notificationFor: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  message: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = Notification = mongoose.model(
  "notification",
  NotificationSchema
);
