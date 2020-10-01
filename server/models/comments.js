const mongoose = require("mongoose");

//Comments schema
const commentSchema = new mongoose.Schema({
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    name: String
  },
  text: String,
  added: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("Comment", commentSchema);
