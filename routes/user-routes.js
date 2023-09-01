const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  deleteUser,
} = require("../controllers/user-controller");

// Route for create user
router.post("/signup", createUser);

// Route for login user
router.post("/login", loginUser);

// Route for delete user
router.delete("/:id", deleteUser);

// Export
module.exports = router;
