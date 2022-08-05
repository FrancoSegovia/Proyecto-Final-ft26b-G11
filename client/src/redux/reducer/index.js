import {
  ALL_PRODUCTS,
  QUERY_PRODUCTS,
  ORDER_PRODUCTS,
  FILTER_PRODUCTS,
} from "../actions";
import orderAndFilter from "../../utils/functions/orderAndFilter";

const initialState = {
  mainProducts: [],
  products: [],
  filters: [],
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
