const express = require("express");
const router = express.Router();
const {
  createPayment,
  paymentSuccess,
} = require("../controllers/paymentController");

// Ruta para crear una nueva preferencia de pago
router.post("/new", createPayment);
router.get("/success", paymentSuccess);

module.exports = router;
