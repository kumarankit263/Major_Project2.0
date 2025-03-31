// import React, { useState } from "react";
// import Heading from "../../components/heading/Heading";
// import Spinner from "../../components/loading/Spinner";
// import useAI from "../../hooks/ai/useAI";
// import InputTag from "../../components/input/InputTag";

// const CropSenseAI = () => {
//   const [prediction, setPrediction] = useState("");
//   const { predictCrops, isLoading } = useAI();

//   const [formData, setFormData] = useState({
//     soil: "",
//     altitude: "",
//     temperature: "",
//     humidity: "",
//     rainfall: "",
//   });

//   const cropPrediction = async () => {
//     let res = await predictCrops(formData);
//     setPrediction(res);
//   };

//   return (
//     <>
//       <Heading text={"Crop Recommendation"} textAlign="text-left" />
//       <div className="container max-w-screen-lg mx-auto">
//         <div>
//           <div className="bg-white px-4">
//             <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
//               <div className="lg:col-span-full">
//                 <form
//                   className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6"
//                   onSubmit={(e) => {
//                     e.preventDefault();
//                     cropPrediction();
//                   }}
//                 >
//                   <div className="md:col-span-6">
//                     <label htmlFor="soil">Soil</label>
//                     <select
//                       name="crop"
//                       required
//                       className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
//                       onChange={(e) => {
//                         setFormData({ ...formData, soil: e.target.value });
//                       }}
//                     >
//                       <option value="" selected disabled>
//                         Select Soil
//                       </option>
//                       <option value="sandy soil">Sandy Soil</option>
//                       <option value="clay soil">Clay Soil</option>
//                       <option value="silt soil">Silt Soil</option>
//                       <option value="peat soil">Peat Soil</option>
//                       <option value="chalk soil">Chalk Soil</option>
//                       <option value="loam soil">Loam Soil</option>
//                     </select>
//                   </div>

//                   <div className="md:col-span-6">
//                     <InputTag
//                       label={"Altitude (in km)"}
//                       type={"number"}
//                       placeholder={"Between 0 and 10 (kilometers)"}
//                       value={formData.altitude}
//                       setFormData={setFormData}
//                       toUpdate={"altitude"}
//                     />
//                   </div>

//                   <div className="md:col-span-2">
//                     <InputTag
//                       label={"Temperature (in °C)"}
//                       type={"number"}
//                       placeholder={"Between -50 and 50 (°Celsius)"}
//                       value={formData.temperature}
//                       setFormData={setFormData}
//                       toUpdate={"temperature"}
//                     />
//                   </div>
//                   <div className="md:col-span-2">
//                     <InputTag
//                       label={"Humidity (in %)"}
//                       type={"number"}
//                       placeholder={"Between 0 and 100 (%)"}
//                       value={formData.humidity}
//                       setFormData={setFormData}
//                       toUpdate={"humidity"}
//                     />
//                   </div>
//                   <div className="md:col-span-2">
//                     <InputTag
//                       label={"Rainfall (in mm)"}
//                       type={"number"}
//                       placeholder={"Between 0 and 1000 (mm)"}
//                       value={formData.rainfall}
//                       setFormData={setFormData}
//                       toUpdate={"rainfall"}
//                     />
//                   </div>

//                   <div className="md:col-span-6 my-2 text-right">
//                     <button
//                       type="submit"
//                       className="inline-flex text-white justify-center items-center bg-rose-700 hover:bg-rose-600text-white font-semibold py-2 px-4 rounded cursor-pointer"
//                     >
//                       {isLoading && <Spinner width="w-5" color="#ffffff" />}
//                       Recommend
//                     </button>
//                   </div>

//                   <div className="md:col-span-full">
//                     <textarea
//                       rows={12}
//                       className="border py-2 mt-1 rounded px-4 w-full bg-gray-50"
//                       placeholder="AI Prediction will be shown here. Note: This prediction may not be accurate. Please consult an expert for better results. Powered by Gemini AI."
//                       readOnly={true}
//                       value={prediction}
//                     />
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CropSenseAI;




import React, { useState } from "react";
import Heading from "../../components/heading/Heading";
import Spinner from "../../components/loading/Spinner";
import useAI from "../../hooks/ai/useAI";
import InputTag from "../../components/input/InputTag";
import { FaRobot } from "react-icons/fa"; // AI Assistant Icon
import { motion } from "framer-motion"; // Animation
import { useNavigate } from "react-router-dom";

const CropSenseAI = () => {
  const [prediction, setPrediction] = useState("");
  const { predictCrops, isLoading } = useAI();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    soil: "",
    altitude: "",
    temperature: "",
    humidity: "",
    rainfall: "",
  });

  const cropPrediction = async () => {
    let res = await predictCrops(formData);
    setPrediction(res);
  };

  return (
    <>
      <Heading text={"Crop Recommendation"} textAlign="text-left" />
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <div className="bg-white px-4">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="lg:col-span-full">
                <form
                  className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6"
                  onSubmit={(e) => {
                    e.preventDefault();
                    cropPrediction();
                  }}
                >
                  <div className="md:col-span-6">
                    <label htmlFor="soil">Soil</label>
                    <select
                      name="crop"
                      required
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      onChange={(e) => {
                        setFormData({ ...formData, soil: e.target.value });
                      }}
                    >
                      <option value="" selected disabled>
                        Select Soil
                      </option>
                      <option value="sandy soil">Sandy Soil</option>
                      <option value="clay soil">Clay Soil</option>
                      <option value="silt soil">Silt Soil</option>
                      <option value="peat soil">Peat Soil</option>
                      <option value="chalk soil">Chalk Soil</option>
                      <option value="loam soil">Loam Soil</option>
                    </select>
                  </div>

                  <div className="md:col-span-6">
                    <InputTag
                      label={"Altitude (in km)"}
                      type={"number"}
                      placeholder={"Between 0 and 10 (kilometers)"}
                      value={formData.altitude}
                      setFormData={setFormData}
                      toUpdate={"altitude"}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <InputTag
                      label={"Temperature (in °C)"}
                      type={"number"}
                      placeholder={"Between -50 and 50 (°Celsius)"}
                      value={formData.temperature}
                      setFormData={setFormData}
                      toUpdate={"temperature"}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <InputTag
                      label={"Humidity (in %)"}
                      type={"number"}
                      placeholder={"Between 0 and 100 (%)"}
                      value={formData.humidity}
                      setFormData={setFormData}
                      toUpdate={"humidity"}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <InputTag
                      label={"Rainfall (in mm)"}
                      type={"number"}
                      placeholder={"Between 0 and 1000 (mm)"}
                      value={formData.rainfall}
                      setFormData={setFormData}
                      toUpdate={"rainfall"}
                    />
                  </div>

                  <div className="md:col-span-6 my-2 text-right">
                    <button
                      type="submit"
                      className="inline-flex text-white justify-center items-center bg-rose-700 hover:bg-rose-600 text-white font-semibold py-2 px-4 rounded cursor-pointer"
                    >
                      {isLoading && <Spinner width="w-5" color="#ffffff" />}
                      Recommend
                    </button>
                  </div>

                  <div className="md:col-span-full">
                    <textarea
                      rows={12}
                      className="border py-2 mt-1 rounded px-4 w-full bg-gray-50"
                      placeholder="AI Prediction will be shown here. Note: This prediction may not be accurate. Please consult an expert for better results. Powered by Gemini AI."
                      readOnly={true}
                      value={prediction}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Assistant Floating Button */}
      <button onClick={() => navigate("/ai-assistant")}>
      <motion.div
        className="fixed bottom-14 right-5 bg-blue-500 text-white p-4 rounded-full shadow-lg cursor-pointer flex items-center justify-center hover:bg-blue-600"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="AI Assistant"
      >
        <FaRobot size={28} />
      </motion.div>
      </button>
    </>
  );
};

export default CropSenseAI;
