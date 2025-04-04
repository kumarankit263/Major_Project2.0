// import React, { useState } from "react";
// import { FaLeaf } from "react-icons/fa";

// const soilTypes = ["Clayey", "Loamy", "Black", "Red", "Sandy"];
// const cropTypes = [
//   "Barley", "Cotton", "Ground Nuts", "Maize", "Millets", "Oil seeds",
//   "Paddy", "Pomegranate", "Pulses", "Rice", "Sugarcane", "Tobacco",
//   "Wheat", "Watermelon", "Coffee", "Kidney Beans", "Orange"
// ];

// const YieldPredictionPage = () => {
//   const [formData, setFormData] = useState({
//     temperature: "",
//     humidity: "",
//     moisture: "",
//     soilType: "",
//     cropType: "",
//     nitrogen: "",
//     potassium: "",
//     phosphorous: ""
//   });
//   const [prediction, setPrediction] = useState(null);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:8080/api/fertilzer-prediction", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData)
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data = await response.json();
//       setPrediction(data.prediction !== undefined ? `Predicted Yield: ${data.prediction.toFixed(2)} tons` : "Prediction data not available.");
//     } catch (error) {
//       setPrediction("Failed to fetch prediction. " + error.message);
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-green-600">
//         <FaLeaf/>Fertilizer Prediction
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input 
//           type="number" 
//           name="temperature" 
//           placeholder="Temperature" 
//           onChange={handleChange} 
//           required 
//           className="w-full p-2 border rounded" 
//         />
//         <input 
//           type="number" 
//           name="humidity" 
//           placeholder="Humidity" 
//           onChange={handleChange} 
//           required 
//           className="w-full p-2 border rounded" 
//         />
//         <input 
//           type="number" 
//           name="moisture" 
//           placeholder="Moisture" 
//           onChange={handleChange} 
//           required 
//           className="w-full p-2 border rounded" 
//         />

//         <select 
//           name="soilType" 
//           value={formData.soilType} 
//           onChange={handleChange} 
//           required 
//           className="w-full p-2 border rounded"
//         >
//           <option value="">Select Soil Type</option>
//           {soilTypes.map((type, index) => (
//             <option key={index} value={type}>{type}</option>
//           ))}
//         </select>

//         <select 
//           name="cropType" 
//           value={formData.cropType} 
//           onChange={handleChange} 
//           required 
//           className="w-full p-2 border rounded"
//         >
//           <option value="">Select Crop Type</option>
//           {cropTypes.map((crop, index) => (
//             <option key={index} value={crop}>{crop}</option>
//           ))}
//         </select>

//         <input 
//           type="number" 
//           name="nitrogen" 
//           placeholder="Nitrogen" 
//           onChange={handleChange} 
//           required 
//           className="w-full p-2 border rounded" 
//         />
//         <input 
//           type="number" 
//           name="potassium" 
//           placeholder="Potassium" 
//           onChange={handleChange} 
//           required 
//           className="w-full p-2 border rounded" 
//         />
//         <input 
//           type="number" 
//           name="phosphorous" 
//           placeholder="Phosphorous" 
//           onChange={handleChange} 
//           required 
//           className="w-full p-2 border rounded" 
//         />
        
//         <button 
//           type="submit" 
//           className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
//         >
//           Predict
//         </button>
//       </form>

//       {prediction && <p className="mt-4 text-lg font-semibold text-center">{prediction}</p>}
//     </div>
//   );
// };

// export default YieldPredictionPage;




// import React, { useState } from "react";
// import axios from "axios";

// const FertilizerPrediction = () => {
//     const [formData, setFormData] = useState({
//         temp: "",
//         humi: "",
//         mois: "",
//         soil: "Clayey",
//         crop: "Barley",
//         nitro: "",
//         pota: "",
//         phosp: ""
//     });
//     const [result, setResult] = useState("");

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post("http://localhost:8080/predict", formData);
//             setResult(response.data.prediction);
//         } catch (error) {
//             console.error("Error:", error);
//             setResult("Prediction failed");
//         }
//     };

//     return (
//         <div>
//             <h2>Fertilizer Prediction</h2>
//             <form onSubmit={handleSubmit}>
//                 <input type="text" name="temp" placeholder="Temperature" onChange={handleChange} />
//                 <input type="text" name="humi" placeholder="Humidity" onChange={handleChange} />
//                 <input type="text" name="mois" placeholder="Moisture" onChange={handleChange} />
//                 <select name="soil" onChange={handleChange}>
//                     <option value="Clayey">Clayey</option>
//                     <option value="Loamy">Loamy</option>
//                     <option value="Black">Black</option>
//                     <option value="Red">Red</option>
//                     <option value="Sandy">Sandy</option>
//                 </select>
//                 <select name="crop" onChange={handleChange}>
//                     <option value="Barley">Barley</option>
//                     <option value="Cotton">Cotton</option>
//                     <option value="Ground Nuts">Ground Nuts</option>
//                     <option value="Maize">Maize</option>
//                     <option value="Millets">Millets</option>
//                     <option value="Oil seeds">Oil seeds</option>
//                     <option value="Paddy">Paddy</option>
//                     <option value="Pomegranate">Pomegranate</option>
//                     <option value="Pulses">Pulses</option>
//                     <option value="Rice">Rice</option>
//                     <option value="Sugarcane">Sugarcane</option>
//                     <option value="Tobacco">Tobacco</option>
//                     <option value="Wheat">Wheat</option>
//                     <option value="Watermelon">Watermelon</option>
//                     <option value="Coffee">Coffee</option>
//                     <option value="Kidney Beans">Kidney Beans</option>
//                     <option value="Orange">Orange</option>
//                 </select>
//                 <input type="text" name="nitro" placeholder="Nitrogen" onChange={handleChange} />
//                 <input type="text" name="pota" placeholder="Potassium" onChange={handleChange} />
//                 <input type="text" name="phosp" placeholder="Phosphorous" onChange={handleChange} />
//                 <button type="submit">Predict</button>
//             </form>
//             {result && <h3>Prediction: {result}</h3>}
//         </div>
//     );
// };

// export default FertilizerPrediction;





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