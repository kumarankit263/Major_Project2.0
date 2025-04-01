
const express = require("express");
const router = express.Router();
const { checkout, verifyPayment } = require("../controllers/paymentController"); // ✅ Import controller

router.post("/checkout", checkout); // ✅ Make sure checkout function is correctly imported
router.post("/verify", verifyPayment); // ✅ Make sure verifyPayment function is correctly imported

module.exports = router;




