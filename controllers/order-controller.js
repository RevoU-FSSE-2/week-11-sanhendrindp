const mongoose = require("mongoose");
const Order = require("../models/order-model");
const Product = require("../models/product-model");

const getAllOrder = (req, res, next) => {
  Order.find()
    .select("_id productId quantity")
    .exec()
    .then((docs) => {
      console.log(docs);
      const response = {
        Message: `Success get all orders`,
        Count: docs.length,
        Orders: docs.map((doc) => {
          return {
            _id: doc._id,
            productId: doc.productId,
            quantity: doc.quantity,
            request: {
              type: "GET",
              url: "http://localhost:3000/orders/" + doc._id,
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
};

const createOrder = (req, res, next) => {
  Product.findById(req.body.productId)
    .then((product) => {
      // If productId not exist, 404 not found (can't create order)
      if (!product) {
        return res.status(404).json({
          Message: "Product not found",
        });
      }

      const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        productId: req.body.productId,
        quantity: req.body.quantity,
      });
      return order.save();
    })
    .then((result) => {
      console.log(result);
      res.status(201).json({
        Message: `Order created successfully`,
        Order: {
          _id: result._id,
          productId: result.productId,
          quantity: result.quantity,
          request: {
            type: "GET",
            url: "http://localhost:3000/orders/" + result._id,
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
};

const getOrder = (req, res, next) => {
  const id = req.params.id;

  Order.findById(id)
    .select("_id productId quantity")
    .exec()
    .then((doc) => {
      console.log(doc);

      if (doc) {
        res.status(200).json({
          Message: `Order for ID ${id} found`,
          Order: doc,
        });
      } else {
        res.status(404).json({
          Message: `No order found for provided ID`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        Error: err,
      });
    });
};

const deleteOrder = (req, res, next) => {
  const id = req.params.id;

  Order.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        Message: "Order deleted successfully",
        Result: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        Error: err,
      });
    });
};

module.exports = { getAllOrder, createOrder, getOrder, deleteOrder };
