import React, { useState } from "react";
import { FaSeedling } from "react-icons/fa";

const statesOfIndia = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
    "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const seasons = ["Kharif", "Rabi", "Summer"];

const YieldPrediction = () => {
    const [formData, setFormData] = useState({
        state: "",
        district: "",
        season: "",
        crop: "",
        area: ""
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
                <FaSeedling /> Yield Prediction
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <select name="state" value={formData.state} onChange={handleChange} required className="w-full p-2 border rounded">
                    <option value="">Select State</option>
                    {statesOfIndia.map((state, index) => (
                        <option key={index} value={state}>{state}</option>
                    ))}
                </select>
                <input type="text" name="district" placeholder="District" onChange={handleChange} required className="w-full p-2 border rounded" />
                <select name="season" value={formData.season} onChange={handleChange} required className="w-full p-2 border rounded">
                    <option value="">Select Season</option>
                    {seasons.map((season, index) => (
                        <option key={index} value={season}>{season}</option>
                    ))}
                </select>
                <input type="text" name="crop" placeholder="Crop" onChange={handleChange} required className="w-full p-2 border rounded" />
                <input type="number" name="area" placeholder="Area (in sq.feet)" step="0.01" onChange={handleChange} required className="w-full p-2 border rounded" />
                <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition">
                    Predict
                </button>
            </form>
            {prediction && <p className="mt-4 text-lg font-semibold text-center">{prediction}</p>}
        </div>
    );
};

export default YieldPrediction;
