const router = require("express").Router();
const Post = require("../models/Post");

// get all posts
router.get("/", async (req, res) => {
  const posts = await Post.find();
  try {
    res.json(posts);
  } catch (err) {
    res.status(400).json("Error: " + err)
  }
});

// router.post("/", async (req, res) => {
//   const postData = new Post(req.body);

//   try {
//     await postData.save();
//     res.send(postData);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// create a post
router.post("/", async (req, res) => {
  // retrieve the data from the req
  const { title, location, description, date, contactInfo } = req.body;

  // construct the post
  const newPost = new Post({
    title,
    location,
    description,
    date,
    contactInfo,
  });

  // save post model
  try {
    const savedPost = await newPost.save();
    res.json(savedPost);
  } catch (err) {
    console.error(err);
  }
});

// update post
router.patch("/:id", async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.params.id, req.body, {
      useFindAndModify: false,
    });
    // const savedPost = await Post.save();
    res.send("Post Updated!");
  } catch (err) {
    res.status(500).send(err);
  }
});

//delete post
router.delete("/:id", (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    post.remove((err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(204).send("removed");
      }
    });
  });
});

module.exports = router;

//TODO: TEST POST REQUESTS WITH POSTMAN
//TODO: CREATE MORE ENDPOINTS