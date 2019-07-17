const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotebookSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  title: {
    type: String,
    required: true
  }
});

module.exports = Notebooks = mongoose.model("notebooks", NotebookSchema);

const EntrySchema = new Schema({
  notebook: {
    type: Schema.Types.ObjectId,
    ref: "notebooks"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  body: {
    type: String,
    required: true
  }
});

module.exports = Entries = mongoose.model("entries", EntrySchema);
