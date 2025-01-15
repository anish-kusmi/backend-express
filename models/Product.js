const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  instock: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: false
  },
  images: {
    type: [String],
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  },
});
const Product = mongoose.model("products", productSchema);
module.exports = Product;