import React, { useEffect, useState } from "react";
import Spinner from "../../components/loading/Spinner";
import { useSelector } from "react-redux";
import { notify } from "../../utils/helper/notification";
import { MdCancel } from "react-icons/md";
import LeafletMap from "../../components/map/LeafletMap";
import { useCookies } from "react-cookie";
import InputTag from "../../components/input/InputTag";
import useProducts from "../../hooks/products/useProducts";

function AddProduct() {
  const [cookies] = useCookies(["brandName"]);
  const { updateProduct, addProduct, isLoading, setIsLoading } = useProducts();

  const productEditData = useSelector(
    (state) => state.sellerEditProductReducer
  );

  const [renderMap, setRenderMap] = useState(false);

  const [lat, setLat] = useState(22.49);
  const [long, setLong] = useState(80.1);

  const [formData, setFormData] = useState({
    image: null,
    brand: cookies.brandName || "",
    category: "",
    name: "",
    description: "",
    pricePerUnit: "",
    measuringUnit: "",
    minimumOrderQuantity: "",
    location: {
      coordinates: [long, lat],
    },
    deliveryRadius: "",
    quantity: "",
    shelfLife: "",
  });

  useEffect(() => {
    setRenderMap(true);
  }, []);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      location: { coordinates: [long, lat] },
    }));
    console.log("Latitude:", lat, "Longitude:", long); // Logs whenever they update
  }, [lat, long]);
  

  const handleSubmit = async () => {
    console.log("Submitting form with data:", formData);  // Debugging log
    if (!formData.image) {
      notify("Please upload product image", "info");
      return;
    }
    if (!formData.location.coordinates[1] || !formData.location.coordinates[0]) {
      notify("Please select location", "info");
      return;
    }
    setIsLoading(true);
    await addProduct(formData);
    setIsLoading(false);
  };
  

  return (
    <>
      <div className="h-full w-full">
        <div className="pointer-events-none relative flex min-h-[calc(100%-1rem)] items-center  w-11/12 mx-auto my-12">
          <form
            className="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current outline-none"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 py-4">
              <h5 className="text-xl font-medium leading-normal text-neutral-800">
                Add Product
              </h5>
              <button
                className="text-base py-2 px-6 flex flex-row justify-center items-center text-white font-medium rounded-full cursor-pointer uppercase bg-sky-700"
                type="submit"
              >
                {isLoading ? <Spinner width="w-5" color="#ffffff" /> : null}
                <span>ADD</span>
              </button>
            </div>
            <div className="relative py-6">
              <div className="space-y-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6">
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col relative items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-10">
                        {formData.image ? (
                          <span>
                            <img
                              src={
                                typeof formData.image === "string"
                                  ? formData.image
                                  : URL.createObjectURL(formData.image)
                              }
                              loading="lazy"
                              className="w-full h-full bg-blue-300"
                            />
                            <MdCancel
                              className="text-4xl absolute top-0 right-0 translate-x-[50%] -translate-y-[50%]"
                              onClick={(e) => {
                                e.preventDefault();
                                setFormData({
                                  ...formData,
                                  image: null,
                                });
                              }}
                            />
                          </span>
                        ) : (
                          <div className="flex flex-col items-center justify-center py-24">
                            <svg
                              className="w-8 h-8 mb-4 text-gray-500"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 16"
                            >
                              <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                              />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">
                              SVG, PNG, JPG or JPEG
                            </p>
                          </div>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const uploadedImage = e.target.files[0];
                            setFormData({
                              ...formData,
                              image: uploadedImage,
                            });
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="col-span-4">
                    <InputTag
                      label={"Product Name"}
                      type={"text"}
                      placeholder={"Fresh Apples"}
                      setFormData={setFormData}
                      toUpdate={"name"}
                      value={formData.name}
                      outlineColor={"outline-cyan-800"}
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-2">
                    <label className="text-sm font-medium text-gray-900 block mb-2">
                      Category
                    </label>
                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 outline-cyan-800"
                      value={formData.category} // Controlled via state
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      required
                    >
                      <option value="" disabled>
                        Select
                      </option>
                      <option value="rice">Rice</option>
                      <option value="wheat">Wheat</option>
                      <option value="nuts">Nuts</option>
                      <option value="sugar">Sugar</option>
                      <option value="spices">Spices</option>
                      <option value="fruits">Fruits</option>
                      <option value="vegetables">Vegetables</option>
                      <option value="pulses">Pulses</option>
                    </select>
                  </div>

                  <div className="col-span-2 sm:col-span-2">
                    <InputTag
                      label={"Measuring Unit"}
                      type={"text"}
                      placeholder={"kg"}
                      setFormData={setFormData}
                      toUpdate={"measuringUnit"}
                      value={formData.measuringUnit}
                      outlineColor={"outline-cyan-800"}
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-2">
                    <InputTag
                      label={"Price per unit"}
                      type={"number"}
                      placeholder={"Rs.2000"}
                      setFormData={setFormData}
                      toUpdate={"pricePerUnit"}
                      value={formData.pricePerUnit}
                      outlineColor={"outline-cyan-800"}
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-2">
                    <InputTag
                      label={"Minimum Order Quantity"}
                      type={"number"}
                      placeholder={"5 kg"}
                      setFormData={setFormData}
                      toUpdate={"minimumOrderQuantity"}
                      value={formData.minimumOrderQuantity}
                      outlineColor={"outline-cyan-800"}
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-2">
                    <InputTag
                      label={"Stocks Left"}
                      type={"number"}
                      placeholder={"20 kg"}
                      setFormData={setFormData}
                      toUpdate={"quantity"}
                      value={formData.quantity}
                      outlineColor={"outline-cyan-800"}
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-2">
                    <InputTag
                      label={"Shelf Life"}
                      type={"text"}
                      placeholder={"20 Days"}
                      setFormData={setFormData}
                      toUpdate={"shelfLife"}
                      value={formData.shelfLife}
                      outlineColor={"outline-cyan-800"}
                    />
                  </div>
                </div>
                <div>
                  <textarea
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-4 outline-cyan-800"
                    placeholder="Add Product Description"
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    value={formData.description}
                    rows="5"
                  ></textarea>
                </div>
              </div>

              <div className="relative py-6">
                {renderMap && (
                  <LeafletMap
                    center={[lat, long]}
                    zoom={10}
                    onMarkerChange={(coordinates) => {
                      setLat(coordinates.lat);
                      setLong(coordinates.lng);
                    }}
                  />
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
