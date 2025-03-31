const Product = require("../models/productSchema");


function setupWebSocket(io) {
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    const pollInterval = setInterval(async () => {
      try {
        const products = await Product.find({}).select("quantity");
        socket.emit("stockUpdate", products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }, 7 * 24 * 60 * 60 * 1000); // Poll every 5 seconds

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      clearInterval(pollInterval);
    });
  });
}

module.exports = { setupWebSocket };





