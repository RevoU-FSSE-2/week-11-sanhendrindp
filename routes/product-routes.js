const express = require("express");
const router = express.Router();
const Product = require("../models/product-model");
const mongoose = require("mongoose");

// Route for get all products
router.get("/", (req, res, next) => {
  res.status(200).json({
    Message: `Get all products`,
  });
});

// Route for create a product
router.post("/", (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });
  // Store to database
  product
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.log(err));

  res.status(201).json({
    Message: `Product created`,
    Product: product,
  });
});

// Route for get a product by id
router.get("/:id", (req, res, next) => {
  const id = req.params.id;

  if (id === "special") {
    res.status(200).json({
      Message: `You get special id`,
      ID: id,
    });
  } else {
    res.status(200).json({
      Message: `You passed special id`,
      ID: id,
    });
  }
});

// Route for update a product
router.patch("/:id", (req, res, next) => {
  const id = req.params.id;

  res.status(200).json({
    Message: `Product updated`,
    ID: id,
  });
});

// Route for delete a product
router.delete("/:id", (req, res, next) => {
  const id = req.params.id;

  res.status(200).json({
    Message: `Product deleted`,
    ID: id,
  });
});

// Export
module.exports = router;
