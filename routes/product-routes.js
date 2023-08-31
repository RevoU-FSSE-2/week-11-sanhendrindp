const express = require("express");
const router = express.Router();
const Product = require("../models/product-model");
const mongoose = require("mongoose");

// Route for get all products
router.get("/", (req, res, next) => {
  Product.find()
    .select("_id name price")
    .exec()
    .then((docs) => {
      console.log(docs);
      const response = {
        Message: `Success get all products`,
        Count: docs.length,
        Products: docs.map((doc) => {
          return {
            _id: doc._id,
            name: doc.name,
            price: doc.price,
            request: {
              type: "GET",
              url: "http://localhost:3000/products/" + doc._id,
            },
          };
        }),
      };

      res.status(200).json(response);
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
        Message: `Product created successfully`,
        Product: {
          _id: result._id,
          name: result.name,
          price: result.price,
          request: {
            type: "GET",
            url: "http://localhost:3000/products/" + result._id,
          },
        },
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
    .select("_id name price")
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
      res.status(200).json({
        Message: `Product for ID ${id} updated`,
        // Update: result,
        Product: {
          type: "GET",
          url: "http://localhost:3000/products/" + id,
        },
      });
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
      res.status(200).json({
        Message: "Product deleted successfully",
        Result: result,
      });
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
