const express = require("express")
const app = express()

//ROUTES
app.get("/", (req, res) => {
  res.send("we are on home");
})

app.get("/posts", (req, res) => {
  res.send("we are on posts");
})

app.listen(3000, () => {
  console.log("Server is listening on port 3000...")
})