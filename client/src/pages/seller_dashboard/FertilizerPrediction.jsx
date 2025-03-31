import React, { useState } from "react";
import { FaLeaf } from "react-icons/fa";

const soilTypes = ["Clayey", "Loamy", "Black", "Red", "Sandy"];
const cropTypes = [
  "Barley", "Cotton", "Ground Nuts", "Maize", "Millets", "Oil seeds",
  "Paddy", "Pomegranate", "Pulses", "Rice", "Sugarcane", "Tobacco",
  "Wheat", "Watermelon", "Coffee", "Kidney Beans", "Orange"
];

const YieldPredictionPage = () => {
  const [formData, setFormData] = useState({
    temperature: "",
    humidity: "",
    moisture: "",
    soilType: "",
    cropType: "",
    nitrogen: "",
    potassium: "",
    phosphorous: ""
  });
  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/yield-prediction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setPrediction(data.prediction !== undefined ? `Predicted Yield: ${data.prediction.toFixed(2)} tons` : "Prediction data not available.");
    } catch (error) {
      setPrediction("Failed to fetch prediction. " + error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-green-600">
        <FaLeaf/>Fertilizer Prediction
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="number" 
          name="temperature" 
          placeholder="Temperature" 
          onChange={handleChange} 
          required 
          className="w-full p-2 border rounded" 
        />
        <input 
          type="number" 
          name="humidity" 
          placeholder="Humidity" 
          onChange={handleChange} 
          required 
          className="w-full p-2 border rounded" 
        />
        <input 
          type="number" 
          name="moisture" 
          placeholder="Moisture" 
          onChange={handleChange} 
          required 
          className="w-full p-2 border rounded" 
        />

        <select 
          name="soilType" 
          value={formData.soilType} 
          onChange={handleChange} 
          required 
          className="w-full p-2 border rounded"
        >
          <option value="">Select Soil Type</option>
          {soilTypes.map((type, index) => (
            <option key={index} value={type}>{type}</option>
          ))}
        </select>

        <select 
          name="cropType" 
          value={formData.cropType} 
          onChange={handleChange} 
          required 
          className="w-full p-2 border rounded"
        >
          <option value="">Select Crop Type</option>
          {cropTypes.map((crop, index) => (
            <option key={index} value={crop}>{crop}</option>
          ))}
        </select>

        <input 
          type="number" 
          name="nitrogen" 
          placeholder="Nitrogen" 
          onChange={handleChange} 
          required 
          className="w-full p-2 border rounded" 
        />
        <input 
          type="number" 
          name="potassium" 
          placeholder="Potassium" 
          onChange={handleChange} 
          required 
          className="w-full p-2 border rounded" 
        />
        <input 
          type="number" 
          name="phosphorous" 
          placeholder="Phosphorous" 
          onChange={handleChange} 
          required 
          className="w-full p-2 border rounded" 
        />
        
        <button 
          type="submit" 
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
        >
          Predict
        </button>
      </form>

      {prediction && <p className="mt-4 text-lg font-semibold text-center">{prediction}</p>}
    </div>
  );
};

export default YieldPredictionPage;
