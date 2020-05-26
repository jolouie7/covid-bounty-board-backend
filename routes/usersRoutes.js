const router = require("express").Router();
const User = require("../models/User");

// get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
})

router.post("/add", async (req, res) => {
  try {
    const username = await req.body.username;
    const newUser = await new User({username}).save();
    res.json("User added!")
  } catch (err) {
    res.status(400).json("Error: " + err)
  }
})

module.exports = router;