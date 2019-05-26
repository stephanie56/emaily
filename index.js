require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
require("./models/User");
require("./services/passport");

const authRoutes = require("./routes/authRoutes");

mongoose
  .connect(process.env.DB_URI, { useNewUrlParser: true })
  .then(data => console.log("Connected to DB success!"))
  .catch(err => console.log(err));

const app = express();

authRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
