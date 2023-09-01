const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
const {
  getAllProduct,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product-controller");

// Route for get all products
router.get("/", getAllProduct);

// Route for create a product
router.post("/", checkAuth, upload.single("productImage"), createProduct);

// Route for get a product by id
router.get("/:id", getProduct);

// Route for update a product
router.patch("/:id", checkAuth, updateProduct);

// Route for delete a product
router.delete("/:id", checkAuth, deleteProduct);

// Export
module.exports = router;
