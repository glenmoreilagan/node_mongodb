const express = require('express')
const router = express.Router()
const PostModel = require('../models/post')

// get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await PostModel.find();

    res.json(posts)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

router.post("/", async (req, res) => {
  const posts = new PostModel({
    title: "Title",
    slug: "Slug",
    tags: [{ optionOne: "optionOne", optionTwo: "optionTwo" }]
  })

  try {
    const newPost = await posts.save()

    res.json(newPost)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

module.exports = router