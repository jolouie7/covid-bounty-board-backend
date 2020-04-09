const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

//Import Routes
const postsRoute = require("./routes/posts")

app.use("/posts", postsRoute);


// //MIDDLEWARE
// app.use("/posts", () => {
//   console.log("posts middleware was hit");
// })

//ROUTES
app.get("/", (req, res) => {
  res.send("we are on home");
})

app.get("/posts", (req, res) => {
  res.send("we are on posts");
})

//Connect to DB
mongoose.connect("process.env.MONGO_URI", { useNewUrlParser: true }, () => {
  console.log("Connected to DB!!!!")
});

//Listen to server
app.listen(3000, () => {
  console.log("Server is listening on port 3000...")
})