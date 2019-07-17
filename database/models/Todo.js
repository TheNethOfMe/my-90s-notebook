const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoListSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  list: {
    type: [Schema.Types.ObjectId],
    ref: "items"
  }
});

module.exports = TodoLists = mongoose.model("lists", TodoListSchema);

const TodoItemSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  position: {
    type: Number,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});

module.exports = TodoItems = mongoose.model("items", TodoItemSchema);
