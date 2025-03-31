// const express = require("express");
// const { createPaymentIntent } = require("../controllers/paymentController");

// const router = express.Router();

// router.post("/create-payment-intent", createPaymentIntent);

// module.exports = router;

// 111
// const express = require("express");
// const router = express.Router();
// const { createCheckoutSession } = require("../controllers/paymentController");

// // ✅ Make sure this route is correctly set up
// router.post("/create-checkout-session", createCheckoutSession);

// module.exports = router;



const express = require("express");
const router = express.Router();
const { checkout, verifyPayment } = require("../controllers/paymentController"); // ✅ Import controller

router.post("/checkout", checkout); // ✅ Make sure checkout function is correctly imported
router.post("/verify", verifyPayment); // ✅ Make sure verifyPayment function is correctly imported

module.exports = router;




