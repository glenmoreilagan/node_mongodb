const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  sku: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  additionalInfo: {
    type: String,
  },
  price: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
  coffeeType: {
    type: Array,
  },
  roastLevel: {
    type: Array,
  },
  productImage: {
    type: String,
  },
  productStatus: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Product', ProductSchema)
