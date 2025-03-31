// import './App.css'
import React, { useEffect, useMemo } from "react";
import LoginAndSignup from "./pages/account";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Product from "./pages/products";
import Navbar from "./components/navbar/Navbar";
import SellerDashboard from "./pages/seller_dashboard";
import ProductDashboard from "./pages/product_details";
import Order from "./pages/orders";
import LeafletMap from "./components/map/LeafletMap";
import SellerProductOperation from "./pages/seller_product_operation";
import ShowMap from "./pages/map";
import { Analytics } from "@vercel/analytics/react";
import ScrollToTop from "./components/scroll/ScrollToTop";
import Footer from "./components/footer/Footer";
import Home from "./pages/home";
import Verify from "./pages/verify";
import SellerOverview from "./pages/seller_dashboard/SellerOverview";
import SellerProducts from "./pages/seller_dashboard/SellerProducts";
import SellerOrderRequests from "./pages/seller_dashboard/SellerOrderRequests";
import SellerFAQs from "./pages/seller_dashboard/SellerFAQs";
import CropSenseAI from "./pages/seller_dashboard/CropSenseAI";
import AddProduct from "./pages/seller_dashboard/AddProduct";
import AIAssistant from "./pages/seller_dashboard/AIAssistant";
import NewsLetter from "./pages/seller_dashboard/News";
import Policy from "./components/footer/Policy";
import Terms from "./components/footer/Terms";
import Weather from "./pages/seller_dashboard/Weather";
import YieldPrediction from "./pages/seller_dashboard/YieldPrediction";
import FertilizerPrediction from "./pages/seller_dashboard/FertilizerPrediction";
function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Navbar />
        {/* <div className="min-h-[calc(100vh-120px)] md:min-h-[calc(100vh-50px)]"> */}
        <Routes>
          <Route exact path="/" element={<Home />} />
              
          <Route exact path="/account/:type" element={<LoginAndSignup />} />
          <Route exact path="/:type/verify/:token" element={<Verify />} />
          <Route exact path="/sellerdashboard" element={<SellerDashboard />}>
            <Route index element={<Navigate to="overview" replace />} />
            <Route exact path="overview" element={<SellerOverview />} />
            <Route exact path="products" element={<SellerProducts />} />
            <Route path="products/product/add" element={<AddProduct />} />

            <Route exact path="orders" element={<SellerOrderRequests />} />
            <Route exact path="faqs" element={<SellerFAQs />} />
            <Route exact path="cropsense-ai" element={<CropSenseAI />} />
            <Route  exact path="newsletter" element={<NewsLetter />} />
            <Route exact path="weather-forecast" element={<Weather />} />
            <Route exact path="yield-prediction" element={<YieldPrediction />} />
            <Route exact path="fertilizer-prediction" element={<FertilizerPrediction />} />
            {/* / */}
            {/* <Route  exact path="/ai-assistant" element={<AIAssistant />} /> */}
            {/*  */}
          </Route>
            <Route  exact path="/ai-assistant" element={<AIAssistant />} />
            {/* <Route  exact path="/sellerdashboard/newsletter" element={<NewsLetter />} /> */}
          <Route exact path="/map/:latitude/:longitude" element={<ShowMap />} />
          <Route
            exact
            path="/sellerdashboard/products/:operation"
            element={<SellerProductOperation />}
          />
          <Route exact path="/category/:type" element={<Product />} />
          <Route
            exact
            path="/category/:type/details/:productId"
            element={<ProductDashboard />}
          />
          <Route exact path="/orders" element={<Order />} />
          <Route exact path="/map" element={<LeafletMap />} />
           {/* ✅ Added Terms & Policy Routes inside the main Routes block */}
           <Route exact path="/terms-and-conditions" element={<Terms />} />
           <Route exact path="/privacy-policy" element={<Policy />} />
        </Routes>
        {/* </div> */}
      </Router>
    
      <Footer />
      <Analytics />
    </>
  );
}

export default App;
