
const Product = require("../models/productSchema"); // Adjust the path if needed
// Decrease Product Stocks
const decreaseProductStocks = async (productId, quantityPurchased) => {
  try {
    const product = await Product.findById(productId);
    product.quantity -= quantityPurchased;
    await product.save();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  decreaseProductStocks
}
