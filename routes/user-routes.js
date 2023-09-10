const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const checkRole = require("../middleware/role-auth");
const {
  createUser,
  loginUser,
  getUser,
  deleteUser,
} = require("../controllers/user-controller");

// Route for create user
router.post("/signup", createUser);

// Route for login user
router.post("/login", loginUser);

// Route for get all user
router.get("/", checkAuth, checkRole(["admin"]), getUser);

// Route for delete user
router.delete("/:id", checkAuth, checkRole(["admin"]), deleteUser);

// Export
module.exports = router;
