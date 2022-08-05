import orderAndFilter from "../../utils/functions/orderAndFilter";
import { ALL_PRODUCTS, ORDER_PRODUCTS, FILTER_PRODUCTS } from "../actions";

const initialState = {
  // noChangeProducts: [],
  products: [],
  filters: [],
  orders: "",
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ALL_PRODUCTS: {
        return {
          ...state,
          products: payload
        }
    }

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

    default:
      return state;
  }
};

export default reducer;
