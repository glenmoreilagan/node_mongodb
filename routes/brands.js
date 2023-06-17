const express = require('express')
const router = express.Router()
const BrandModel = require('../models/brand')

// get all brand
router.get('/', async (req, res) => {
  try {
    const posts = await BrandModel.find()

    res.json(posts)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post('/', async (req, res) => {
  const { brand } = req.body
  const brandObj = new BrandModel({
    brand: brand,
  })

  try {
    const newBrand = await brandObj.save()

    res.json(newBrand)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.put('/:brandId', async (req, res) => {
  const { brand } = req.body
  const { brandId } = req.params

  try {
    const updateBrand = await BrandModel.findOneAndUpdate(
      { _id: brandId },
      {
        brand: brand,
      },
      { new: true }
    )

    res.json(updateBrand)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
