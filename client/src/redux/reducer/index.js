import shopOrder from "../../utils/functions/shopOrder";
import shopFilter from "../../utils/functions/shopFilter";
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
  ADD_SHOPPINGCART,
  DELETE_SHOPPINGCART,
} from "../actions";

const initialState = {
  mainProducts: [],
  products: [],
  mainShops: [],
  shops: [],
  shopFilter: "",
  shopOrder: "",
  cart:[],
  error: false,
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

    case ADD_SHOPPINGCART:
      return {
        ...state,
        cart: [...state.cart, payload]
      }

      case DELETE_SHOPPINGCART :
        const updatedCart = state.cart.filter((p) => p !== payload)
        return {
          ...state,
          cart: [...updatedCart]
        }

    /////////////////////////////////////////////////

    default:
      return state;
  }
};

export default reducer;
