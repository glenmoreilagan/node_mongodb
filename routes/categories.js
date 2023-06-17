const express = require('express')
const router = express.Router()
const CategoryModel = require('../models/category')

// get all category
router.get('/', async (req, res) => {
  try {
    const posts = await CategoryModel.find()

    res.json(posts)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post('/', async (req, res) => {
  const { category } = req.body
  const categoryObj = new CategoryModel({
    category: category,
  })

  try {
    const newCategory = await categoryObj.save()

    res.json(newCategory)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.put('/:catId', async (req, res) => {
  const { category } = req.body
  const { catId } = req.params

  try {
    const updateCategory = await CategoryModel.findOneAndUpdate(
      { _id: catId },
      {
        category: category,
      },
      { new: true }
    )

    res.json(updateCategory)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
