const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const userRoutes = require("./app/routes/userRoutes");
const categoryRoutes = require("./app/routes/categoryRoutes");
const productRoutes = require("./app/routes/productRoutes");
const orderRoutes = require("./app/routes/orderRoutes");
const cartRoutes = require("./app/routes/cartRoutes");
const authRoutes = require("./app/routes/authRoute");
const paymentRoutes = require("./app/routes/paymentRoutes");

const mercadopago = require("mercadopago");

// Inicializar Mercado Pago
mercadopago.configure({
  access_token:
    "APP_USR-4538150663921858-120518-9431b9a170a8ffa2d329754a9a67fa36-313525372",
});

const app = express();
app.use(bodyParser.json());

const cors = require("cors");
const morgan = require("morgan");
app.use(cors());

app.use(morgan("dev"));

dotenv.config();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("Hola, el servidor está funcionando!");
});
// Middleware para las rutas
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/uploads", express.static("uploads"));

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http: localhost:${PORT}`);
});
