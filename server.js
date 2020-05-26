const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
// ! fix: process.env.DB_HOST is giving access errors
const port = process.env.DB_HOST || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Import Routes
app.use("/posts", require("./routes/postsRoutes.js"));
app.use("/users", require("./routes/usersRoutes"))


// //MIDDLEWARE
// app.use("/posts", () => {
//   console.log("posts middleware was hit");
// })

//ROUTES
app.get("/", (req, res) => {
  res.send("we are on home");
})

//Connect to DB
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to DB!!!!");
  }
);

//Listen to server
app.listen(5000, () => {
  console.log("Server is listening on port 5000...")
})