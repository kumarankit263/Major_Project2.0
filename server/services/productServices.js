
const Product = require("../models/productSchema"); // Adjust the path if needed

// const decreaseProductStocks = async (productId, orderQty) => {
//   try {
//     console.log(`Product ID: ${productId}, Order Quantity: ${orderQty}`);

//     // Validate orderQty
//     if (isNaN(orderQty) || orderQty <= 0) {
//       console.log("Invalid order quantity:", orderQty);
//       return;
//     }

//     // Fetch product
//     const product = await Product.findById(productId);
//     if (!product) {
//       console.log("Product not found");
//       return;
//     }

//     console.log(`Current stock: ${product.stockQuantity}, Order Quantity: ${orderQty}`);

//     // Ensure stockQuantity is a number
//     if (isNaN(product.stockQuantity)) {
//       console.log("Invalid stock quantity in database:", product.stockQuantity);
//       return;
//     }

//     // Reduce stock
//     const newStock = product.stockQuantity - orderQty;

//     // Prevent negative stock
//     if (newStock < 0) {
//       console.log("Not enough stock!");
//       return;
//     }

//     // Update stock in DB
//     await Product.findByIdAndUpdate(productId, { stockQuantity: newStock });

//     console.log(`New stock quantity: ${newStock}`);
//   } catch (error) {
//     console.error("Error decreasing stock:", error);
//   }
// };


// module.exports = {
//     decreaseProductStocks
// }


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