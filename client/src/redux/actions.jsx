import { EDIT_PRODUCT, ADD_PRODUCT_DATA, ADD_TO_CART, REMOVE_FROM_CART, INC_QTY_IN_CART, DEC_QTY_IN_CART, SET_USER_LOCATION, REMOVE_ALL_FROM_CART } from "./constants"


import { USER_LOGIN, SELLER_LOGIN } from "./constants";
import { toast } from "react-toastify";

export const userLogin = (userData) => {
  console.log("User Data in Login:", userData); // Debugging

  const userName = userData?.name || "User"; // Ensure name is always present
  toast.success(`Welcome ${userName}`);

  return {
    type: USER_LOGIN,
    payload: userData,
  };
};

export const sellerLogin = (sellerData) => {
  console.log("Seller Data in Login:", sellerData); // Debugging

  const sellerName = sellerData?.name || "Seller"; // Ensure name is always present
  toast.success(`Welcome ${sellerName}`);

  return {
    type: SELLER_LOGIN,
    payload: sellerData,
  };
};


// Product Actions
// Add Product Data Action
export const addProductData = (data) => {
    return {
        type: ADD_PRODUCT_DATA,
        payload: data
    }
}

export const addToCart = (product) => {
    return {
        type: ADD_TO_CART,
        payload: product
    }
}

export const setUserLocation = (location) => {
    return {
        type: SET_USER_LOCATION,
        payload: location
    }
}


export const removeFromCart = (productId) => {
    return {
        type: REMOVE_FROM_CART,
        payload: productId
    }
}

export const removeAllProductfromCart = () => {
    return {
        type: REMOVE_ALL_FROM_CART,
        payload: null
    }
}

export const increaseProductQty = (productId) => {
    return {
        type: INC_QTY_IN_CART,
        payload: productId
    }
}


export const decreaseProductQty = (productId) => {
    return {
        type: DEC_QTY_IN_CART,
        payload: productId
    }
}


export const editProductDetails = (productDetails) => {
    return {
        type: EDIT_PRODUCT,
        payload: productDetails
    }
}