const express = require("express");
const router = express.Router();
const ProductModel = require("../models/product");

router.get("/", async (req, res) => {
  try {
    // finding from nested object
    // const products = await ProductModel.find({ "uom.amount": { $eq: "45.01" } });
    
    const products = await ProductModel.find();

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const product = new ProductModel({
    name: "BIGAS",
    uom: [
      {
        uom: "KG",
        amount: "45.01",
      },
    ],
  });

  try {
    const newProduct = await product.save();

    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
