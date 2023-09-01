const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const {
  getAllOrder,
  createOrder,
  getOrder,
  deleteOrder,
} = require("../controllers/order-controller");

// Route for get all orders
router.get("/", checkAuth, getAllOrder);

// Route for create an order
router.post("/", checkAuth, createOrder);

// Route for get an order by id
router.get("/:id", checkAuth, getOrder);

// Route for delete an order
router.delete("/:id", checkAuth, deleteOrder);

// Export
module.exports = router;
