const express = require("express");
const router = express.Router();

// Route for get all orders
router.get("/", (req, res, next) => {
  res.status(200).json({
    Message: `Get all orders`,
  });
});

// Route for create an order
router.post("/", (req, res, next) => {
  res.status(201).json({
    Message: `Order created`,
  });
});

// Route for get an order by id
router.get("/:id", (req, res, next) => {
  const id = req.params.id;

  res.status(200).json({
    Message: `Get an order`,
    ID: id,
  });
});

// Route for update an order
router.patch("/:id", (req, res, next) => {
  const id = req.params.id;

  res.status(200).json({
    Message: `Order updated`,
    ID: id,
  });
});

// Route for delete an order
router.delete("/:id", (req, res, next) => {
  const id = req.params.id;

  res.status(200).json({
    Message: `Order deleted`,
    ID: id,
  });
});

// Export
module.exports = router;
