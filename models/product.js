const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  uom: {
    type: Array,
    default: [
      { uom: "box", amount: "100.00" },
      { uom: "pcs", amount: "10.00" },
    ],
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
