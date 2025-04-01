const Order = require("../models/orderSchema");
const { decreaseProductStocks } = require("../services/productServices");

const addOrder = async (req, res) => {
  try {
    const orders = req.body;
    const userId = req.userId; 

    console.log("Received User ID in Controller:", userId);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User ID is missing" });
    }

    if (!Array.isArray(orders)) {
      return res.status(400).json({ message: "Invalid orders data" });
    }

    const orderPromises = orders.map(async (order) => {
      const newOrder = new Order({
        ...order,
        userId: userId, 
      });

      let result = await newOrder.save();
      console.log("Order Saved:", result);

      await decreaseProductStocks(newOrder.productId, newOrder.orderQty);
    });

    await Promise.all(orderPromises);

    res.status(200).json({ message: "All orders successfully received" });
  } catch (error) {
    console.error("Order Creation Error:", error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

module.exports = { addOrder };





const addOrder1 = async (req, res) => {
  try {
    const orders = req.body;
    const userId = req.userId; // Ensure userId is coming from middleware

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User ID is missing" });
    }

    // Check if orders is an array
    if (!Array.isArray(orders)) {
      return res.status(400).json({ message: "Invalid orders data" });
    }

    // Process each order and add userId
    const orderPromises = orders.map(async (order) => {
      const newOrder = new Order({
        ...order,
        userId: userId, // Assign userId here
      });

      let result = await newOrder.save();
      console.log("Order Saved:", result);

      await decreaseProductStocks(newOrder.productId, newOrder.orderQty);
    });

    await Promise.all(orderPromises);

    res.status(200).json({ message: "All orders successfully received" });
  } catch (error) {
    console.error("Order Creation Error:", error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

module.exports = { addOrder };


// Retrieve Order by Seller ID
const showOrdersBySeller = async (req, res) => {
  console.log("Seller ID from request:", req.sellerId);

  try {
    let data = await Order.find({ sellerId: req.sellerId })
      .populate({
        path: "productId",
        select: "image category name measuringUnit pricePerUnit",
      })
      .populate({ path: "userId", select: "name email contact" })
      .lean();

    console.log(data);

    data = data.map((order) => {
      const totalPrice = order.orderQty * order.productId?.pricePerUnit;
      return { ...order, totalAmount: totalPrice };
    });

    res.status(200).send(data);
  } catch (error) {
    res.status(500).send("Something went wrong!");
    console.log(error);
  }
};

module.exports = {
  addOrder,
  showOrdersBySeller,
};
