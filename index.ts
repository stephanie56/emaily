require("dotenv").config();
import express from "express";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import passport from "passport";
require("./models/User");
require("./services/passport");

import authRoutes from "./routes/authRoutes";

mongoose
  .connect(process.env.DB_URI, { useNewUrlParser: true })
  .then((_: any) => console.log("Connected to DB success!"))
  .catch((err: Error) => console.error(err));

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
