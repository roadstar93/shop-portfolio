const mongoose = require("mongoose");

//Products schema
const productSchema = new mongoose.Schema({
  title: String,
  stock: { type: Number, default: 1},
  description: String,
  price: Number,
  category: String,
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

module.exports = mongoose.model("Product", productSchema);
