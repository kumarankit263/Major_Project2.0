





import React, { useState } from "react";
import axios from "axios";

const FertilizerPrediction = () => {
    const [formData, setFormData] = useState({
        temp: "",
        humi: "",
        mois: "",
        soil: "Clayey",
        crop: "Barley",
        nitro: "",
        pota: "",
        phosp: ""
    });
    const [result, setResult] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/predict", formData);
            setResult(response.data.prediction);
        } catch (error) {
            console.error("Error:", error);
            setResult("Prediction failed");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Fertilizer Prediction</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="temp" placeholder="Temperature" onChange={handleChange} className="w-full p-2 border rounded" />
                    <input type="text" name="humi" placeholder="Humidity" onChange={handleChange} className="w-full p-2 border rounded" />
                    <input type="text" name="mois" placeholder="Moisture" onChange={handleChange} className="w-full p-2 border rounded" />
                    
                    <select name="soil" onChange={handleChange} className="w-full p-2 border rounded">
                        <option value="Clayey">Clayey</option>
                        <option value="Loamy">Loamy</option>
                        <option value="Black">Black</option>
                        <option value="Red">Red</option>
                        <option value="Sandy">Sandy</option>
                    </select>
                    
                    <select name="crop" onChange={handleChange} className="w-full p-2 border rounded">
                        <option value="Barley">Barley</option>
                        <option value="Cotton">Cotton</option>
                        <option value="Ground Nuts">Ground Nuts</option>
                        <option value="Maize">Maize</option>
                        <option value="Millets">Millets</option>
                        <option value="Oil seeds">Oil seeds</option>
                        <option value="Paddy">Paddy</option>
                        <option value="Pomegranate">Pomegranate</option>
                        <option value="Pulses">Pulses</option>
                        <option value="Rice">Rice</option>
                        <option value="Sugarcane">Sugarcane</option>
                        <option value="Tobacco">Tobacco</option>
                        <option value="Wheat">Wheat</option>
                        <option value="Watermelon">Watermelon</option>
                        <option value="Coffee">Coffee</option>
                        <option value="Kidney Beans">Kidney Beans</option>
                        <option value="Orange">Orange</option>
                    </select>
                    
                    <input type="text" name="nitro" placeholder="Nitrogen" onChange={handleChange} className="w-full p-2 border rounded" />
                    <input type="text" name="pota" placeholder="Potassium" onChange={handleChange} className="w-full p-2 border rounded" />
                    <input type="text" name="phosp" placeholder="Phosphorous" onChange={handleChange} className="w-full p-2 border rounded" />
                    
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Predict</button>
                </form>
                {result && <h3 className="text-center text-lg font-semibold text-gray-700 mt-4">Prediction: {result}</h3>}
            </div>
        </div>
    );
};

export default FertilizerPrediction;
