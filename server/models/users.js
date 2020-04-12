const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

//Setting up user schema
const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  password: String,
  age: Number,
  cart: [],
  isAdmin: { type: Boolean, default: false }
});

userSchema.plugin(passportLocalMongoose); //Using passport for authentication
module.exports = mongoose.model("Usser", userSchema);
