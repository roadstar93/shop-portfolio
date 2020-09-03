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
  function (req, res, next) {
    console.log(req.body);
    next();
  },
  passport.authenticate("local"),
  (req, res) => {
    console.log("logged in", req.user);
    var userInfo = {
      id: req.user._id,
      isAdmin: req.user.isAdmin,
      username: req.user.username,
      age: req.user.age,
      email: req.user.email,
    };
    res.send(userInfo);
  }
);

router.put("api/updateAddress/:id", function (req, res,nex){
  const { zip, streetAdress, city, country } = req.body;

  const updateAddress = {
    country: country,
    city: city,
    streetAdress: streetAdress,
    zip: zip
  };

  User.findByIdAndUpdate(req.params.id, updateAddress, function(
    error,
    updatedAddress
  ) {
    if (error) {
      res.status(400).json(`Error getting products ${error}`);
      res.send("Error: " + error.message);
    } else {
      console.log(`Product updated successfully ${updatedAddress}`);
      res.status(200).json(`Product updated successfully ${updatedAddress}`)
    }
  });

})

router.get("/api/logout", (req, res) => {
  if (req.user) {
    req.logout();
    res.send({ msg: "logging out" });
  } else {
    res.send({ msg: "no user to log out" });
  }
});

module.exports = router;
