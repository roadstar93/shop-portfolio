const mongoose = require("mongoose");

//Comments schema
const commentSchema = new mongoose.Schema({
  text: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    name: String
  },
  added: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("Comments", commentSchema);
