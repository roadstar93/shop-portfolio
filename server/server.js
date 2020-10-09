const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const flash = require("connect-flash");
const cors = require("cors");
const passport = require("passport");
const User = require("./models/users");
const LocalStrategy = require("passport-local");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const commentRoutes = require("./routes/commentRoutes");
const API_PORT = process.env.PORT || 3001;

//depencies init
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(flash());
app.use(
  require("express-session")({
    secret: "A special secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Pass user info to all routes
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

//Database connection
const dbConnection =
  process.env.MONGODB_URI || "mongodb://localhost/shopalot-v1";
mongoose
  .connect(dbConnection, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch((error) => handleError(error));

app.use(productRoutes);
app.use(userRoutes);
app.use(commentRoutes);

if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("../client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
