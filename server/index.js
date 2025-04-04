require("./config/connectDB.js");
// const connectDB = require("./config/connectDB.js");
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();
const axios=require("axios");
const { setupWebSocket } = require("./services/setupWebSocket");
// connectDB();

const product = require("./routes/product"); //done
const review = require("./routes/review");
const order = require("./routes/order");
const faq = require("./routes/faq");
const graph = require("./routes/graph.js");
const ai = require("./routes/ai.js"); //done
const auth = require("./routes/auth"); // done
const chatRoutes = require("./routes/chatRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const PORT = 8080;
const app = express();

const allowedOrigins = ["https://localhost:5173","https://yield-prediction-f3dg.onrender.com/predict","https://fertilizer-prediction-1myh.onrender.com/predict"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());

const server = http.createServer(app);
const io = new Server(server);

setupWebSocket(io);

// Health Check
app.get("/", (req, res) => {
  res.send("CropConnect Server is running");
});

// Routes
app.use("/auth", auth); 
app.use("/products", product);
app.use("/reviews", review);
app.use("/order", order);
app.use("/faqs", faq);
app.use("/graph", graph);
app.use("/ai", ai); 
app.use("/api",chatRoutes);
app.use("/api/payment", paymentRoutes);



app.post("/api/yield-prediction", async (req, res) => {
  try {
    const response = await axios.post("https://yield-prediction-f3dg.onrender.com/predict", req.body);
    console.log("Prediction Response:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching prediction:", error.message);
    res.status(500).json({ error: "Prediction failed" });
  }
});

app.post("/predict",async(req,res)=>{
  try{
    const {temp,humi,mois,soil,crop,nitro,pota,phosp}=req.body;
    if (!temp || !humi || !mois || !soil || !crop || !nitro || !pota || !phosp) {
      return res.status(400).json({ error: "All fields are required!" });
        }

    const response = await axios.post("https://fertilizer-prediction-1myh.onrender.com/predict",{
      temp,humi,mois,soil,crop,nitro,pota,phosp
    });
    console.log("Prediction Response:", response.data);
    res.json(response.data);
  }
  catch(error){
    console.log("Error fetching prediction:",error.message);
    res.status(500).json({ error: "Prediction failed" });
  }
})
server.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
