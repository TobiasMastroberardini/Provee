const express = require("express");
const router = express.Router();
const { createPayment } = require("../controllers/paymentController");

// Ruta para crear una nueva preferencia de pago
router.post("/new", createPayment);

module.exports = router;
