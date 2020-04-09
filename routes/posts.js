const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.get("/posts", (req, res) => {
  res.send("we are on posts");
});

module.exports = router;