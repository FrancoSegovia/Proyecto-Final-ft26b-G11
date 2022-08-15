import shopOrder from "../../utils/functions/shopOrder";
import shopFilter from "../../utils/functions/shopFilter";
import jwtDecode from "jwt-decode";
// import productOrder from "../../utils/functions/productOrder";
// import productFitler from "../../utils/functions/productFilter";

import {
  ALL_SHOPS,
  QUERY_SHOPS,
  ORDER_SHOPS,
  FILTER_SHOPS,
  ORDER_PRODUCTS,
  FILTER_PRODUCTS,
  QUERY_ERROR,
  ERROR_CLEANER,
  SIGN_IN,
  ADD_SHOPPINGCART,
  DELETE_SHOPPINGCART,
  SIGN_OUT,
  ALL_USERS,
  GET_SHOPPINGCART,
} from "../actions";

const initialState = {
  mainProducts: [],
  products: [],
  mainShops: [],
  shops: [],
  shopFilter: "",
  shopOrder: "",
  cart: [],
  error: false,
  user: {
    type: "",
    token: localStorage.getItem("token"),
    name: "",
    lastName: "",
    eMail: "",
    _id: "",
    phone: null,
    vehicle: "",
  },
  _id: "",
  users: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ALL_SHOPS: {
      return {
        ...state,
        mainShops: payload,
        shops: payload,
      };
    }

    case QUERY_SHOPS: {
      return {
        ...state,
        shops: payload,
      };
    }

    case ALL_USERS: {
      return {
        ...state,
        users: payload,
      };
    }

    /////////////////////////////////////////////////

    case ORDER_SHOPS:
      if (payload === "DEFAULT") {
        let newOrder = [...state.mainShops];
        newOrder = newOrder.filter((s) => state.shops.includes(s));
        return {
          ...state,
          shopOrder: "",
          shops: [...newOrder],
        };
      } else {
        let newOrder = [...state.shops];
        newOrder = shopOrder(newOrder, payload);
        return {
          ...state,
          shopOrder: payload,
          shops: [...newOrder],
        };
      }

    case FILTER_SHOPS:
      let newFilter = [...state.mainShops];
      newFilter = shopFilter(newFilter, payload, state.shopOrder);
      return {
        ...state,
        shopFilter: payload,
        shops: [...newFilter],
      };

    case ORDER_PRODUCTS:
      return {
        ...state,
        products: [...state.mainProducts],
      };

    case FILTER_PRODUCTS:
      return {
        ...state,
        products: [...state.mainProducts],
      };

    /////////////////////////////////////////////////

    case QUERY_ERROR:
      return {
        ...state,
        error: payload,
      };

    case ERROR_CLEANER:
      return {
        ...state,
        error: payload,
      };

    /////////////////////////////////////////////////

    case GET_SHOPPINGCART:
      return {
        ...state,
      };

    case ADD_SHOPPINGCART:
      return {
        ...state,
        cart: [...state.cart, payload],
      };

    case DELETE_SHOPPINGCART:
      const updatedCart = state.cart.filter((p) => p !== payload);
      return {
        ...state,
        cart: [...updatedCart],
      };

    /////////////////////////////////////////////////

    case SIGN_IN: {
      const data = jwtDecode(payload);
      return {
        ...state,
        user: {
          ...state.user,
          token: payload,
          _id: data._id,
          type: data.type,
          name: data.name,
          lastName: data.lastName,
          eMail: data.email,
          phone: data.phone ? data.phone : null,
          vehicle: data.vehicle ? data.vehicle : "",
        },
      };
    }

    case SIGN_OUT:
      localStorage.removeItem("token");
      return {
        ...state,
        user: {
          ...state.user,
          type: "",
          token: null,
          name: "",
          lastName: "",
          eMail: "",
          _id: "",
          phone: null,
          vehicle: "",
        },
      };

    /////////////////////////////////////////////////

    default:
      return state;
  }
};

export default reducer;
