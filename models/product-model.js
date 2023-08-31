const mongoose = require("mongoose");

const productModel = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  price: Number,
});

// Export Product model
module.exports = mongoose.model("Product", productModel);
