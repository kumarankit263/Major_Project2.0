import { USER_LOGIN, USER_LOGOUT, SELLER_LOGIN, SELLER_LOGOUT } from "../constants";

const initialState = {
  user: null,
  seller: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        user: action.payload ? { ...action.payload, name: action.payload.name || "User" } : null,
      };

    case USER_LOGOUT:
      return { ...state, user: null };

    case SELLER_LOGIN:
      return {
        ...state,
        seller: action.payload ? { ...action.payload, name: action.payload.name || "Seller" } : null,
      };

    case SELLER_LOGOUT:
      return { ...state, seller: null };

    default:
      return state;
  }
};
