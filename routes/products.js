const express = require("express");
const router = express.Router();
const ProductModel = require("../models/product");

const Pusher = require("pusher");

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

router.get("/", async (req, res) => {
  try {
    // finding from nested object
    // const products = await ProductModel.find({ "uom.amount": { $eq: "45.01" } });
    pusher.trigger(process.env.PUSHER_CHANNEL, "event-test-realtime", {
      message: "hello world",
    });

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
