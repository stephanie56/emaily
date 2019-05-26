require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
require("./models/User");
require("./services/passport");

const authRoutes = require("./routes/authRoutes");

mongoose
  .connect(process.env.DB_URI, { useNewUrlParser: true })
  .then(_ => console.log("Connected to DB success!"))
  .catch(err => console.log(err));

const app = express();
app.use(
  cookieSession({
    // Expires cookies in 30 days
    maxAge: 30 * 24 * 3600 * 1000,
    keys: [process.env.COOKIE_KEY]
  })
);
app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
