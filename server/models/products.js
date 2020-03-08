const mongoose = require("mongoose");

//Products schema
const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  images: [],
  added: { type: Date, default: Date.now() },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    name: String
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

module.exports = mongoose.model("Products", productSchema);
