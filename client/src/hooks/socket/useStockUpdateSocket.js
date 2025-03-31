import React, { useEffect } from "react";
import io from "socket.io-client";


const useStockUpdateSocket = (setProductDashboardData) => {
  useEffect(() => {
    const socket = io("http://localhost:8080", {
      transports: ["websocket"],
    });

    socket.on("stockUpdate", (stockLeft) => {
      setProductDashboardData((prevData) => {
        return {
          ...prevData,
          quantity: stockLeft,
        };
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);
};

export default useStockUpdateSocket;