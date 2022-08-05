import {
  ALL_PRODUCTS,
  QUERY_PRODUCTS,
  ORDER_PRODUCTS,
  FILTER_PRODUCTS,
  QUERY_ERROR,
  QUERY_ERROR_CLEANER
} from "../actions";
import orderAndFilter from "../../utils/functions/orderAndFilter";

const initialState = {
  mainProducts: [],
  products: [],
  filters: [],
  error:false,
  orders: "",
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

    case QUERY_ERROR: {
      return {
        ...state,
        error: payload,
      };
    }

    case QUERY_ERROR_CLEANER: {
      console.log(payload);
      return {
        ...state,
        error: payload,
      };
    }

    /////////////////////////////////////////////////
    case ORDER_PRODUCTS:
      return {
        ...state,
        order: payload,
      };

    case FILTER_PRODUCTS:
      if (state.filters.includes(payload)) {
        return {
          ...state,
          filters: state.filters.filter((f) => f !== payload),
        };
      }
      return {
        ...state,
        filters: [...state.filters, payload],
      };

    /////////////////////////////////////////////////
    default:
      return state;
  }
};

export default reducer;
