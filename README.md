**# KrishiBazaar - Empowering Farmers and Consumers**

## **Features**

### **Dual Interfaces**  
KrishiBazaar provides separate interfaces for consumers and sellers. Users can **Sign Up** and **Sign In** with **email verification** to secure their accounts.

---

### **Seller Side**

- **Visualizing Sales Data**: Sellers can view **graphical reports** of their sales using **Recharts**.
- **Product Management**: Sellers can **add, edit, and delete** products with images, details, location (via map), stock availability, and minimum order quantity.
- **Order Management**: A dashboard shows **order requests** with **location coordinates** on a map.
- **FAQ Section**: Sellers can answer common questions about their products, which will be visible to consumers.
- **CropSense AI**: Predicts **suitable crops** based on input parameters using **Gemini AI**.
- **Fertilizer Prediction**: Uses **Machine Learning (ML)** to suggest the best fertilizers based on **soil and crop conditions**.
- **Crop Prediction Enhancement**: Improves **CropSense AI** with **advanced ML models** for better crop recommendations.
- **News Integration**: Provides real-time **agricultural news** and **market trends** using an API.
- **AI Chatbot**: Helps users with **agricultural queries, product recommendations,** and general FAQs.

---

### **Consumer Side**

- **User-Friendly Interface**: Consumers can browse products **easily** from the homepage.
- **Detailed Product Dashboard**: Displays **product details, stock availability,** and **minimum order quantity**. Users can add products to their **cart**.
- **Review System**: Users can leave **reviews** on products to build trust and transparency.
- **Contact Farmer Form**: Consumers can **ask questions** about products, and answered queries will appear in the **FAQ section**. The **product location** is shown on a map.
- **Dynamic Cart Functionality**: Users can **adjust product quantities** while ensuring that **minimum order and stock limits** are met.
- **Seamless Checkout**: Consumers can **review orders**, choose **delivery locations**, and place orders securely.
- **Real-Time Stock Updates**: Uses **WebSocket (socket.io)** to update stock availability **instantly** (Works locally but may not work on Vercel).
- **Payment Gateway**: Integrates **Razorpay** for a **secure and smooth payment** experience.

---

## **Technologies Used**
MongoDB – Database

Node.js & Express.js – Backend server and RESTful APIs

React.js & Redux – Frontend UI and state management

Tailwind CSS – Responsive and utility-first CSS framework

Socket.io (WebSocket) – Real-time updates (chat, notifications, etc.)

Cloudinary – Image storage and management

Leaflet.js – Interactive map integration

Unsplash API – Product image sourcing

Recharts – Data visualization and graphs

Gemini AI – Crop prediction using natural language processing

Custom Machine Learning Models:

Fertilizer Recommendation Model – Recommends suitable fertilizers based on crop and soil data

Yield Prediction Model – Predicts crop yield using environmental and agricultural parameters

Razorpay  – Payment gateway integration for transactions

---

## **Installation**
### **To run CropConnect locally, ensure you have NodeJS and MongoDB installed.**

### **Clone the repository:**
```sh
git clone <repository-url>
cd CropConnect
```

### **Frontend Setup:**
1. Navigate to the `client` folder.
2. Create a `.env` file in the root directory and add:
```env
VITE_CROPCONNECT_API = http://localhost:8080/
RAZORPAY_KEY_ID = {your razorpay key id}
RAZORPAY_KEY_SECRET = {your razorpay key secret}
```
3. Install dependencies and run the frontend:
```sh
cd client
npm install
npm run dev
```

### **Backend Setup:**
1. Navigate to the `server` folder.
2. Create a `.env` file in the root directory and add:
```env
MONGO_DB_URL = {your mongodb url}
GEMINI_API_KEY = {your gemini api key}
GMAIL_ID = {your gmail id}
GMAIL = {your gmail id}
APP_PASSWORD = {your google account app password}
JWT_SECRET = {your jwt secret}
CLOUDINARY_CLOUD_NAME = {cloudinary cloud name}
CLOUDINARY_API_KEY = {cloudinary api key}
CLOUDINARY_API_SECRET = {cloudinary api secret}
STRIPE_SECRET_KEY = {your stripe secret key}
RAZORPAY_KEY_ID = {your razorpay key id}
RAZORPAY_KEY_SECRET = {your razorpay key secret}

```
3. Install dependencies and run the backend:
```sh
cd server
npm install
nodemon  # Use nodemon for automatic server restarts
# or
node index.js
```

By following these steps, you'll have **CropConnect** running locally. Adjust configurations as needed for your development environment.

---



