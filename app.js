const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const morgan = require("morgan"); // use morgan middleware for logging request & respond
const productRoutes = require("./routes/product-routes");
const orderRoutes = require("./routes/order-routes");
const { error } = require("console");
const mongoose = require("mongoose");

// Connect to mongodb with mongoose
mongoose.connect(process.env.MONGO_URI);

// Middleware
app.use(express.json());
app.use(morgan("dev"));

const port = process.env.PORT || 8000;

// Routes
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

// ============================= LISTEN ===============================

app.get("/", (req, res) => {
  res.send("Welcome!");
});

app.listen(port, () => {
  console.log(`🌩 Server is running on port: ${port} 🌩`);
});

// Error handlers
app.use((req, res, next) => {
  const error = new Error("Not found!");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    Error: error.message,
  });
});
