import {
  ALL_PRODUCTS,
  QUERY_PRODUCTS,
  ORDER_PRODUCTS,
  FILTER_PRODUCTS,
  QUERY_ERROR,
  ERROR_CLEANER,
} from "../actions";

import order from "../../utils/functions/order";
import typeFilter from "../../utils/functions/typeFilter";
import shopFilter from "../../utils/functions/shopFilter";

const initialState = {
  mainProducts: [],
  products: [],
  filtersProducts: "",
  filtersShops: "",
  order: "",
  error: false,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ALL_PRODUCTS: {
      return {
        ...state,
        mainProducts: payload,
        products: payload,
      };
    }

    case QUERY_PRODUCTS: {
      return {
        ...state,
        products: payload,
      };
    }

    /////////////////////////////////////////////////
    case ORDER_PRODUCTS:
      let newOrder = [...state.products];
      newOrder = order(newOrder, payload);
      if (payload === "DEFAULT") {
        return {
          ...state,
          order:"",
          products: [...state.mainProducts],
        };
      } else {
        let newOrder = [...state.products];
        newOrder = order(newOrder, payload);
        return {
          ...state,
          order: payload,
          products: [...newOrder],
        };
      }

    case FILTER_PRODUCTS:
      console.log(payload)
      if(payload === "ALLP" ||  payload === "COMIDA" || payload === "BEBIDA" ){
        let newFilter = [...state.mainProducts];
        newFilter = typeFilter(newFilter, payload, state.order)
        return {
          ...state,
          products: [...newFilter]
        }
      } else {
        let newFilter = [...state.mainProducts];
        newFilter = shopFilter(newFilter, payload, state.order)
        return {
          ...state,
          products: [...newFilter]
        };
      }

    /////////////////////////////////////////////////

    case QUERY_ERROR: {
      return {
        ...state,
        error: payload,
      };
    }

    case ERROR_CLEANER: {
      return {
        ...state,
        error: payload,
      };
    }
    /////////////////////////////////////////////////
    default:
      return state;
  }
};

export default reducer;
