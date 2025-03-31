import React from "react";
import { iconUrlFromCode } from "../services/weatherServices";
const Forecast = ({ title, items }) => {
  console.log("this is item passed on ", items);
  return (
    <div className="w-3/4 mx-auto">
      <div className="flex items-center justify-center my-6">
        <p className="text-white font-medium uppercase">{title}</p>
      </div>
      <hr className="my-2" />
      <div className="flex items-center justify-between text-white">
        {items.map((item) => (
          <div className="flex flex-col items-center justify-center">
            <p className="font-light text-sm">{item.title}</p>
            <img
              src={iconUrlFromCode(item.icon)}
              alt="icon"
              className="w-12 my-1"
            />
            <p className="font-medium">{`${item?.temp}°`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;