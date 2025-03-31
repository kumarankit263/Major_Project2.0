// const Stripe = require("stripe");
// const dotenv = require("dotenv");
// const Order = require("../models/orderSchema"); // Adjust the path as needed    
// dotenv.config();
// const stripe = require('stripe')('sk_test_51PebFdFEZRyQV6i8uxn5VjnaeMhPFbm6BYtom7dclW5pNJlX87tx8g61bvCPQwggbZEYQOczQt6a2WQyEHYLONsY00gQBqNxYc')
// exports.createCheckoutSession = async (req, res) => {
//     try {
//       const { totalAmount } = req.body;
  
//       console.log("✅ Received totalAmount from frontend:", totalAmount);
  
//       // Convert totalAmount to paise (Stripe uses INR in paise)
//       let validTotalAmount = Math.round(Number(totalAmount) * 100);
  
//       if (!validTotalAmount || isNaN(validTotalAmount) || validTotalAmount < 5000) {
//         return res.status(400).json({ error: "Minimum order amount should be ₹50" });
//       }
  
//       console.log("✅ Stripe Payment Total (Paise):", validTotalAmount);
  
//       const session = await stripe.checkout.sessions.create({
//         payment_method_types: ["card"],
//         line_items: [
//           {
//             price_data: {
//               currency: "inr",
//               product_data: { name: "Order Payment" },
//               unit_amount: validTotalAmount,
//             },
//             quantity: 1,
//           }
//         ],
//         mode: "payment",
//         success_url: "http://localhost:3000/success",
//         cancel_url: "http://localhost:3000/cancel",
//       });
  
//       res.json({ id: session.url });
  
//     } catch (error) {
//       console.error("❌ Error creating Stripe session:", error);
//       res.status(500).json({ error: "Stripe session creation failed" });
//     }
//   };



const Razorpay = require("razorpay");
const crypto = require("crypto");
const Payment = require("../models/Payment");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.checkout = async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount) {
      return res.status(400).json({ success: false, message: "Amount is required" });
    }

    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    res.json({ success: true, order });
  } catch (error) {
    console.error("Checkout Error:", error);
    res.status(500).json({ success: false, message: "Payment initialization failed" });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { orderId, paymentId, signature, amount } = req.body;

    if (!orderId || !paymentId || !signature) {
      return res.status(400).json({ success: false, message: "Invalid payment details" });
    }

    const body = orderId + "|" + paymentId;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature === signature) {
      const newPayment = new Payment({
        paymentId,
        orderId,
        amount,
        currency: "INR",
        status: "Success",
      });

      await newPayment.save();
      res.json({ success: true, message: "Payment verified successfully" });
    } else {
      res.status(400).json({ success: false, message: "Payment verification failed" });
    }
  } catch (error) {
    console.error("Payment Verification Error:", error);
    res.status(500).json({ success: false, message: "Error verifying payment" });
  }
};


//new

