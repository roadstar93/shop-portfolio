const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

//Setting up user schema
const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  password: String,
  age: Number,
  orders: [],
  isAdmin: { type: Boolean, default: false },
  address: [{
    country: String,
    city: String,
    streetAdress: String,
    zip: Number,
  }]
});

userSchema.plugin(passportLocalMongoose); //Using passport for authentication
module.exports = mongoose.model("User", userSchema);
