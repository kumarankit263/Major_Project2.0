const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    paymentId: { type: String, required: true },
    orderId: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    status: { type: String, enum: ["Success", "Failed"], default: "Success" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", PaymentSchema);




