const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  desc: {
    type: String,
    required: true,
  },
  colors: {
    type: [{}],
    default: [],
  },
  pic: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["cameras", "plans", "sensors", "extra-protection"],
    required: true,
  },
  price: {
    type: String,
    required: true,
    min: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Index
productSchema.index({ category: 1 });

module.exports = mongoose.model("Product", productSchema);
