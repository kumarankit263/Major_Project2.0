// 111
// import React from "react";
// import { useSelector } from "react-redux";
// import { loadStripe } from "@stripe/stripe-js";
// import { notify } from "../../utils/helper/notification";
// import Spinner from "../../components/loading/Spinner";
// import useOrder from "../../hooks/orders/useOrder";

// const stripePromise =  loadStripe('pk_live_51PebFdFEZRyQV6i8hRq9TUJpy8Dpy7ubaBxacYIXdNlvysc3CwNqWGd8fZiot9dEEmT7dXk8IAiFAD1lbhMzGZUF00ME0H88pF')

// const PaymentCard = ({
//   totalAmount,
//   limitForFreeDelivery,
//   deliveryCharge,
//   customerLatitude,
//   customerLongitude,
// }) => {
//   const cartData = useSelector((state) => state.cartReducer);

//   const validTotalAmount = Math.round(Number(totalAmount) || 0) || 0;

//   // Calculate final amount (including delivery charge)
//   const finalAmount =
//     validTotalAmount >= limitForFreeDelivery
//       ? validTotalAmount
//       : validTotalAmount + Math.round(deliveryCharge);

//   console.log("✅ Final Amount before sending:", finalAmount);

//   const orderNow = async () => {
//     if (customerLatitude === null || customerLongitude === null) {
//       notify("Please allow location access", "info");
//       return;
//     }

//     if (cartData.length === 0) {
//       notify("First add some items to cart", "info");
//       return;
//     }

//     if (isNaN(finalAmount) || finalAmount <= 0) {
//       notify("Invalid payment amount", "error");
//       return;
//     }

//     console.log("📤 Sending totalAmount to backend:", finalAmount);

//     try {
//       const response = await fetch(
//         "http://localhost:8080/api/payment/create-checkout-session",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             totalAmount: finalAmount, // Send only totalAmount
//           }),
//         }
//       );

//       const data = await response.json();

//       if (data.id) {
//         window.location.href = data.id; // Redirect to Stripe checkout
//       } else {
//         notify("Payment failed, try again!", "error");
//       }
//     } catch (error) {
//       console.error("❌ Error processing payment:", error);
//       notify("Error processing payment", "error");
//     }
//   };

//   return (
//     <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
//       <h3 className="text-xl font-semibold leading-5 text-gray-800">Shipping</h3>

//       <div className="flex justify-between items-start w-full">
//         <div className="flex justify-center items-center space-x-4">
//           <div className="w-8 h-8">
//             <img
//               loading="lazy"
//               className="w-full h-full"
//               alt="logo"
//               src="https://i.ibb.co/L8KSdNQ/image-3.png"
//             />
//           </div>
//           <div className="flex flex-col justify-start items-center">
//             <p className="text-lg leading-6 font-semibold text-gray-800">
//               CropConnect
//               <br />
//               <span className="font-normal">Delivery within 24 Hours</span>
//             </p>
//           </div>
//         </div>
//         <p className="text-lg font-semibold leading-6 text-gray-800">
//           Rs. {finalAmount}.00
//         </p>
//       </div>

//       <div className="flex justify-between items-start w-full">
//         <p className="text-lg font-semibold leading-6 text-gray-800">Shipping</p>
//         <p className="text-lg font-semibold leading-6 text-gray-800">
//           Rs. {validTotalAmount >= limitForFreeDelivery ? "0.00" : deliveryCharge + ".00"}
//         </p>
//       </div>

//       <div className="w-full flex justify-center items-center">
//         <button
//           className="hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white flex flex-row justify-center items-center"
//           onClick={orderNow}
//         >
//           Pay Now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PaymentCard;
///111

// **************************
// const PaymentCard = ({
//   totalAmount,
//   limitForFreeDelivery,
//   deliveryCharge,
//   customerLatitude,
//   customerLongitude,
// }) => {
//   const cartData = useSelector((state) => state.cartReducer);

//   // Ensure totalAmount is a valid integer
//   const validTotalAmount = Math.round(Number(totalAmount) || 0);  // Round and ensure number

//   // Calculate final amount including delivery charge
//   const finalAmount =
//     validTotalAmount >= limitForFreeDelivery
//       ? validTotalAmount
//       : validTotalAmount + Math.round(deliveryCharge);
//       const orderNow = async () => {
//         if (customerLatitude === null || customerLongitude === null) {
//           notify("Please allow location access", "info");
//           return;
//         }

//         if (cartData.length === 0) {
//           notify("First add some items to cart", "info");
//           return;
//         }

//         const orderData = cartData.map((item) => ({
//           productId: item._id,
//           orderQty: item.qty,
//           price: Math.round(Number(item.price) || 1), // Ensure price is valid
//           productName: item.name,
//           orderLocation: { coordinates: [customerLongitude, customerLatitude] },
//           sellerId: item.sellerId,
//         }));

//         console.log("✅ Sending totalAmount:", finalAmount);

//         try {
//           const response = await fetch("http://localhost:8080/api/payment/create-checkout-session", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               cartItems: orderData,
//               totalAmount: finalAmount, // Ensure valid total amount
//             }),
//           });

//           const data = await response.json();

//           if (data.id) {
//             window.location.href = data.id; // Redirect to Stripe checkout
//           } else {
//             notify("Payment failed, try again!", "error");
//           }
//         } catch (error) {
//           console.error("Error processing payment:", error);
//           notify("Error processing payment", "error");
//         }
//       };

//   return (
//     <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
//       <h3 className="text-xl font-semibold leading-5 text-gray-800">Shipping</h3>

//       <div className="flex justify-between items-start w-full">
//         <div className="flex justify-center items-center space-x-4">
//           <div className="w-8 h-8">
//             <img
//               loading="lazy"
//               className="w-full h-full"
//               alt="logo"
//               src="https://i.ibb.co/L8KSdNQ/image-3.png"
//             />
//           </div>
//           <div className="flex flex-col justify-start items-center">
//             <p className="text-lg leading-6 font-semibold text-gray-800">
//               CropConnect
//               <br />
//               <span className="font-normal">Delivery within 24 Hours</span>
//             </p>
//           </div>
//         </div>
//         <p className="text-lg font-semibold leading-6 text-gray-800">
//           Rs. {finalAmount}.00
//         </p>
//       </div>

//       {/* Shipping Fee Row */}
//       <div className="flex justify-between items-start w-full">
//         <p className="text-lg font-semibold leading-6 text-gray-800">Shipping</p>
//         <p className="text-lg font-semibold leading-6 text-gray-800">
//           Rs. {validTotalAmount >= limitForFreeDelivery ? "0.00" : deliveryCharge + ".00"}
//         </p>
//       </div>

//       <div className="w-full flex justify-center items-center">
//         <button
//           className="hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white flex flex-row justify-center items-center"
//           onClick={orderNow}
//         >
//           Pay Now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PaymentCard;

// *******************

// const PaymentCard = ({
//   totalAmount,
//   limitForFreeDelivery,
//   deliveryCharge,
//   customerLatitude,
//   customerLongitude,
// }) => {
//   const cartData = useSelector((state) => state.cartReducer);

//   const validTotalAmount = Math.round(Number(totalAmount) || 0);

//   // Calculate final amount (including delivery charge)
//   const finalAmount =
//     validTotalAmount >= limitForFreeDelivery
//       ? validTotalAmount
//       : validTotalAmount + Math.round(deliveryCharge);

//   console.log("✅ Final Amount before sending:", finalAmount);

//   const orderNow = async () => {
//     if (customerLatitude === null || customerLongitude === null) {
//       notify("Please allow location access", "info");
//       return;
//     }

//     if (cartData.length === 0) {
//       notify("First add some items to cart", "info");
//       return;
//     }

//     console.log("✅ Sending totalAmount:", finalAmount);

//     try {
//       const response = await fetch(
//         "http://localhost:8080/api/payment/create-checkout-session",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             totalAmount: finalAmount, // Send only totalAmount
//           }),
//         }
//       );

//       const data = await response.json();

//       if (data.id) {
//         window.location.href = data.id; // Redirect to Stripe checkout
//       } else {
//         notify("Payment failed, try again!", "error");
//       }
//     } catch (error) {
//       console.error("❌ Error processing payment:", error);
//       notify("Error processing payment", "error");
//     }
//   };

//   return (
//     <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
//       <h3 className="text-xl font-semibold leading-5 text-gray-800">Shipping</h3>

//       <div className="flex justify-between items-start w-full">
//         <div className="flex justify-center items-center space-x-4">
//           <div className="w-8 h-8">
//             <img
//               loading="lazy"
//               className="w-full h-full"
//               alt="logo"
//               src="https://i.ibb.co/L8KSdNQ/image-3.png"
//             />
//           </div>
//           <div className="flex flex-col justify-start items-center">
//             <p className="text-lg leading-6 font-semibold text-gray-800">
//               CropConnect
//               <br />
//               <span className="font-normal">Delivery within 24 Hours</span>
//             </p>
//           </div>
//         </div>
//         <p className="text-lg font-semibold leading-6 text-gray-800">
//           Rs. {finalAmount}.00
//         </p>
//       </div>

//       <div className="flex justify-between items-start w-full">
//         <p className="text-lg font-semibold leading-6 text-gray-800">Shipping</p>
//         <p className="text-lg font-semibold leading-6 text-gray-800">
//           Rs. {validTotalAmount >= limitForFreeDelivery ? "0.00" : deliveryCharge + ".00"}
//         </p>
//       </div>

//       <div className="w-full flex justify-center items-center">
//         <button
//           className="hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white flex flex-row justify-center items-center"
//           onClick={orderNow}
//         >
//           Pay Now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PaymentCard;

// import React from "react";
// import useOrder from "../../hooks/orders/useOrder";
// import { useSelector } from "react-redux";
// import Spinner from "../../components/loading/Spinner";
// import { notify } from "../../utils/helper/notification";

// const PaymentCard = ({
//   totalAmount,
//   limitForFreeDelivery,
//   deliveryCharge,
//   customerLatitude,
//   customerLongitude,
// }) => {
//   const cartData = useSelector((state) => state.cartReducer);

//   const { orderProduct, isLoading: isPaymentInitiated } = useOrder();

//   const orderNow = async () => {
//     if (customerLatitude === null || customerLongitude === null) {
//       notify("Please allow the location access", "info");
//       return;
//     }

//     const orderData = [];
//     for (const element of cartData) {
//       orderData.push({
//         productId: element._id,
//         orderQty: element.qty,
//         orderLocation: {
//           coordinates: [customerLongitude, customerLatitude]
//         },
//         sellerId: element.sellerId,
//       });
//     }

//     // console.log("Order data:", orderData);

//     orderProduct(orderData);
//   };

//   return (
//     <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50  space-y-6">
//       <h3 className="text-xl  font-semibold leading-5 text-gray-800">
//         Shipping
//       </h3>
//       <div className="flex justify-between items-start w-full">
//         <div className="flex justify-center items-center space-x-4">
//           <div className="w-8 h-8">
//             <img
//             loading="lazy"
//               className="w-full h-full"
//               alt="logo"
//               src="https://i.ibb.co/L8KSdNQ/image-3.png"
//             />
//           </div>
//           <div className="flex flex-col justify-start items-center">
//             <p className="text-lg leading-6  font-semibold text-gray-800">
//               CropConnect
//               <br />
//               <span className="font-normal">Delivery within 24 Hours</span>
//             </p>
//           </div>
//         </div>
//         <p className="text-lg font-semibold leading-6  text-gray-800">
//           Rs.
//           {totalAmount +
//             (totalAmount >= limitForFreeDelivery ? 0 : deliveryCharge)}
//           .00
//         </p>
//       </div>
//       <div className="w-full flex justify-center items-center">
//         <button
//           className="hover:bg-black    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white flex flex-row justify-center items-center"
//           onClick={() => {
//             if (cartData.length === 0) {
//               notify("First add some items to cart", "info");
//             } else {
//               orderNow();
//             }
//           }}
//         >
//           {isPaymentInitiated && <Spinner width="w-6" color="#ffffff" />}
//           Pay Now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PaymentCard;

import React from "react";
import useOrder from "../../hooks/orders/useOrder";
import { useSelector } from "react-redux";
import Spinner from "../../components/loading/Spinner";
import { notify } from "../../utils/helper/notification";

const PaymentCard = ({
  totalAmount,
  limitForFreeDelivery,
  deliveryCharge,
  customerLatitude,
  customerLongitude,
}) => {
  const cartData = useSelector((state) => state.cartReducer);
  const { orderProduct, isLoading: isPaymentInitiated } = useOrder();

  // Calculate Final Amount with Delivery Charge
  const finalAmount = totalAmount + (totalAmount >= limitForFreeDelivery ? 0 : deliveryCharge);
  console.log("Final Amount for Payment:", finalAmount);

  const orderNow = async () => {
    if (customerLatitude === null || customerLongitude === null) {
      notify("Please allow location access", "info");
      return;
    }

    if (!window.Razorpay) {
      notify("Razorpay SDK not loaded. Please refresh the page.", "error");
      return;
    }

    try {
      // ✅ Request backend to create an order
      const response = await fetch("http://localhost:8080/api/payment/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: finalAmount }), // Use final amount including delivery charge
      });

      const data = await response.json();
      console.log("Checkout Response:", data);

      if (!data.success || !data.order || !data.order.id) {
        notify("Invalid response from server", "error");
        console.error("Error: Order data is missing", data);
        return;
      }

      // ✅ Create Razorpay Payment
      const options = {
        key: "rzp_test_VfMhJ5La9KqY5e", // Replace with your Razorpay Key
        amount: data.order.amount,
        currency: data.order.currency,
        name: "CropConnect",
        description: "Order Payment",
        order_id: data.order.id, // Razorpay Order ID
        handler: async function (response) {
          console.log("Payment Successful, Verifying...", response);

          // ✅ Send payment details to the backend for verification
          const verifyResponse = await fetch("http://localhost:8080/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId: data.order.id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              amount: finalAmount, // Send correct amount
            }),
          });

          const verifyData = await verifyResponse.json();
          console.log("Verification Response:", verifyData);

          if (verifyData.success) {
            notify("Payment successful!", "success");
          } else {
            notify("Payment verification failed", "error");
          }
        },
        prefill: {
          name: "Customer Name", // Replace with actual name
          email: "customer@example.com", // Replace with actual email
          contact: "9999999999", // Replace with actual phone number
        },
        theme: { color: "#3399cc" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      notify("Payment failed. Try again later.", "error");
    }
  };

  return (
    <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
      <h3 className="text-xl font-semibold leading-5 text-gray-800">
        Shipping
      </h3>
      <p className="text-lg font-semibold leading-6 text-gray-800">
        Rs. {finalAmount}.00
      </p>
      <div className="w-full flex justify-center items-center">
        <button
          className="hover:bg-black focus:outline-none py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white flex flex-row justify-center items-center"
          onClick={orderNow}
        >
          {isPaymentInitiated && <Spinner width="w-6" color="#ffffff" />}
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default PaymentCard;



// import React from "react";
// import useOrder from "../../hooks/orders/useOrder";
// import { useSelector } from "react-redux";
// import Spinner from "../../components/loading/Spinner";
// import { notify } from "../../utils/helper/notification";

// const PaymentCard = ({
//   totalAmount,
//   limitForFreeDelivery,
//   deliveryCharge,
//   customerLatitude,
//   customerLongitude,
// }) => {
//   const cartData = useSelector((state) => state.cartReducer);
//   const { orderProduct, isLoading: isPaymentInitiated } = useOrder();

//   const finalAmount = totalAmount + (totalAmount >= limitForFreeDelivery ? 0 : deliveryCharge);

//   const orderNow = async () => {
//     if (customerLatitude === null || customerLongitude === null) {
//       notify("Please allow the location access", "info");
//       return;
//     }

//     if (!window.Razorpay) {
//       notify("Razorpay SDK not loaded. Please refresh the page.", "error");
//       return;
//     }
//     const orderData = [];
//     for (const element of cartData) {
//       orderData.push({
//         productId: element._id,
//         orderQty: element.qty,
//         orderLocation: {
//           coordinates: [customerLongitude, customerLatitude]
//         },
//         sellerId: element.sellerId,
//       });
//     }
//     try {
//       // Send request to backend to create an order
//       const response = await fetch("http://localhost:8080/api/payment/checkout", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ amount: finalAmount }),
//       });

//       const data = await response.json();
//       if (!data.success || !data.order || !data.order.id) {
//         notify("Invalid response from server", "error");
//         console.error("Error: Order data is missing", data);
//         return;
//       }

//       const options = {
//         key: "rzp_test_VfMhJ5La9KqY5e", // Replace with your Razorpay Key
//         amount: data.order.amount,
//         currency: data.order.currency,
//         name: "CropConnect",
//         description: "Order Payment",
//         order_id: data.order.id,
//         handler: async function (response) {
//           const verifyResponse = await fetch("http://localhost:8080/api/payment/verify", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               orderId: data.order.id,
//               paymentId: response.razorpay_payment_id,
//               signature: response.razorpay_signature,
//               amount: finalAmount,
//             }),
//           });

//           const verifyData = await verifyResponse.json();
//           if (verifyData.success) {
//             notify("Payment successful!", "success");
            
//           } else {
//             notify("Payment verification failed", "error");
//           }
//         },
//         prefill: {
//           name: "Customer Name",
//           email: "customer@example.com",
//           contact: "9999999999",
//         },
//         theme: { color: "#3399cc" },
//       };

//       const razorpay = new window.Razorpay(options);
//       razorpay.open();
//     } catch (error) {
//       console.error("Payment error:", error);
//       notify("Payment failed. Try again later.", "error");
//     }
//   };
//    // Function to place the order after payment verification
   
//   return (
//     <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
//       <h3 className="text-xl font-semibold leading-5 text-gray-800">Shipping</h3>
//       <p className="text-lg font-semibold leading-6 text-gray-800">
//         Rs. {finalAmount}.00
//       </p>
//       <div className="w-full flex justify-center items-center">
//         <button
//           className="hover:bg-black focus:outline-none py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white flex flex-row justify-center items-center"
//           onClick={orderNow}
//         >
//           {isPaymentInitiated && <Spinner width="w-6" color="#ffffff" />}
//           Pay Now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PaymentCard;




