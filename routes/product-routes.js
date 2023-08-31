const express = require("express");
const router = express.Router();
const Product = require("../models/product-model");
const mongoose = require("mongoose");

// Route for get all products
router.get("/", (req, res, next) => {
  Product.find()
    .exec()
    .then((docs) => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        Error: err,
      });
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
      res.status(201).json({
        Message: `Product created`,
        Product: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        Error: err,
      });
    });
});

// Route for get a product by id
router.get("/:id", (req, res, next) => {
  const id = req.params.id;

  Product.findById(id)
    .exec()
    .then((doc) => {
      console.log(doc);

      // If there is a doc, status 200, else 404 not found
      if (doc) {
        res.status(200).json({
          Message: `Product for ID ${id} found`,
          Product: doc,
        });
      } else {
        res.status(404).json({
          Message: `No product found for provided ID`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        Error: err,
      });
    });
});

// Route for update a product
router.patch("/:id", (req, res, next) => {
  const id = req.params.id;
  const { name, price } = req.body;

  Product.updateOne({ _id: id }, { $set: { name, price } })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(200).json({
        Error: err,
      });
    });
});

// Route for delete a product
router.delete("/:id", (req, res, next) => {
  const id = req.params.id;

  Product.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        Error: err,
      });
    });
});

// Export
module.exports = router;
