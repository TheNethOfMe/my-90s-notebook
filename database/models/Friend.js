const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FriendSchema = new Schema({
  // The user that initiated the request
  // These will show up in the sender's "sent requests" unless accepted is true
  sentFrom: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  // The user that will recieve the request
  // These will show up in the recipient's "requests" unless accepted or deleted is true
  sentTo: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  // A status of 1 indicates that the recipient has not accepted or rejected the request
  // 1 = pending; 0 = accepted; 2 = rejected
  status: {
    type: Number,
    default: 1
  }
});

module.exports = Friend = mongoose.model("friends", FriendSchema);
