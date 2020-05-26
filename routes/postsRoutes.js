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

//get a single post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json(post)
  } catch (err) {
    res.status(400).json("Error " + err)
  }
})

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
router.post("/add", async (req, res) => {
  // retrieve the data from the req
  const { title, location, description, contactInfo } = req.body;
  const date = Date.now();

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
// I think, You only need to update 1 attribute of a post and it will work
router.patch("/:id", async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.params.id, req.body, {
      useFindAndModify: false,
    });
    // const savedPost = await Post.save();
    res.send("Post Updated!");
  } catch (err) {
    res.status(400).send("Error: " + err);
  }
});

//delete post
router.delete("/:id", async (req, res) => {
  try {
    // you can also use findByIdandDelete
    const post = await Post.findById(req.params.id);
    const deletePost = await post.remove()
    res.json("Post Deleted!")
  } catch (err) {
    res.status(400).send("Error: " + err)
  }
  });

module.exports = router;
