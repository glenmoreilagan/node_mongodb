const express = require('express')
const router = express.Router()
const ProductModel = require('../models/product')
const multer = require('multer')
const path = require('path')
const fileSystem = require('fs')

// const Pusher = require("pusher");

// const pusher = new Pusher({
//   appId: process.env.PUSHER_APP_ID,
//   key: process.env.PUSHER_KEY,
//   secret: process.env.PUSHER_SECRET,
//   cluster: process.env.PUSHER_CLUSTER,
//   useTLS: true,
// });
var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, './uploads/products/')
  },
  filename: (req, file, callBack) => {
    callBack(null, 'PRDCT_IMG' + Date.now() + path.extname(file.originalname))
  },
})
const upload = multer({ storage: storage })
router.get('/', async (req, res) => {
  try {
    const products = await ProductModel.find()

    res.json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post('/', upload.single('productImage'), async (req, res) => {
  // console.log(req.file) you can get filename or path base on storage functions
  const {
    productName,
    sku,
    description,
    additionalInfo,
    quantity,
    price,
    coffeeType,
    roastLevel,
    productImage,
    productStatus,
  } = req.body

  const product = new ProductModel({
    productName: productName,
    sku: sku,
    description: description,
    additionalInfo: additionalInfo,
    quantity: +quantity,
    price: +price,
    coffeeType: coffeeType.split(','),
    roastLevel: roastLevel.split(','),
    productImage: req.file?.path || '',
    productStatus: productStatus,
  })

  try {
    const newProduct = await product.save()
    res.json(newProduct)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/product-image', async (req, res) => {
  let filePath = path.join(`uploads/products/${req.query.q}`)
  var readStream = fileSystem.createReadStream(filePath)
  readStream.pipe(res)
})

module.exports = router
