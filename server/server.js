const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const API_PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(flash());
app.use(
  require("express-session")({
    secret: "A special secret",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

//==============Uncomment after database creation===========
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

//Pass user info to all routes
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});


const dbConnection =
  process.env.MONGODB_URI || "mongodb://localhost/shopalot-v1";
mongoose.connect(dbConnection, { useNewUrlParser: true }).catch(error => handleError(error));

if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("../client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
