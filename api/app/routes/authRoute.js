const express = require("express");
const router = express.Router();
const Auth = require("../controllers/authController");

router.post("/register", Auth.registerCtrl);
router.post("/login", Auth.loginCtrl);

module.exports = router;
