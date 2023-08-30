const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const productRoutes = require("./routes/product-routes");

app.use(express.json());

const port = process.env.PORT || 8000;

// Routes
app.use("/products", productRoutes);

// ============================= LISTEN ===============================

app.get("/", (req, res) => {
  res.send("Welcome!");
});

app.listen(port, () => {
  console.log(`🌩 Server is running on port: ${port} 🌩`);
});
