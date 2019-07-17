const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  content: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: "red"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = Posts = mongoose.model("posts", PostSchema);
