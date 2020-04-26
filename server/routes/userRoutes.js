const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const router = express.Router();
const User = require("../models/users");

router.post("/api/signup", (req, res) => {
  let newUser = {
    email: req.body.email,
    username: req.body.username,
    age: req.body.age,
  };
  User.register(newUser, req.body.password, (error, user) => {
    if (error) {
      console.log(error.message);
      res.status(400).json(`Error creating new user ${error.message}`);
    }
    passport.authenticate("local")(req, res, () => {
      console.log(user);
      res.status(200).json(`New user created succesfully ${user}`);
    });
  });
});

router.post(
  "/api/login",
  passport.authenticate("local", {
    successMessage: "Logged in succesfully",
    failureMessage: "There was a problem logging in",
  }),
  (req, res) => {
    return res.status(200).json(`Logged in succesfull`);
  }
);

module.exports = router;
