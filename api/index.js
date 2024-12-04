const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./app/routes/userRoutes");
const categoryRoutes = require("./app/routes/categoryRoutes");
const productRoutes = require("./app/routes/productRoutes");
const orderRoutes = require("./app/routes/orderRoutes");
const cartRoutes = require("./app/routes/cartRoutes");
const authRoutes = require("./app/routes/authRoute");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

// Middleware para las rutas
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
