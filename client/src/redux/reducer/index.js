import shopOrder from "../../utils/functions/shopOrder";
import shopFilter from "../../utils/functions/shopFilter";

import {
  ALL_SHOPS,
  QUERY_SHOPS,
  ORDER_SHOPS,
  FILTER_SHOPS,
  ORDER_PRODUCTS,
  FILTER_PRODUCTS,
  QUERY_ERROR,
  ERROR_CLEANER,
} from "../actions";

const initialState = {
  mainProducts: [],
  products: [],
  mainShops: [],
  shops: [],
  shopFilter: "",
  shopOrder: "",
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
        newOrder = newOrder.filter(s => state.shops.includes(s))
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

    // case ORDER_PRODUCTS:
    //   let newOrder = [...state.products];
    //   newOrder = order(newOrder, payload);
    //   if (payload === "DEFAULT") {
    //     return {
    //       ...state,
    //       order: "",
    //       products: [...state.mainProducts],
    //     };
    //   } else {
    //     let newOrder = [...state.products];
    //     newOrder = order(newOrder, payload);
    //     return {
    //       ...state,
    //       order: payload,
    //       products: [...newOrder],
    //     };
    //   }

    // case FILTER_PRODUCTS:
    //   if (payload === "ALLP" || payload === "COMIDA" || payload === "BEBIDA") {
    //     let newFilter = [...state.mainProducts];
    //     newFilter = typeFilter(newFilter, payload, state.order);
    //     return {
    //       ...state,
    //       typeFilter: payload === "ALLP" ? "" : payload,
    //       products: [...newFilter],
    //     };
    //   } else {
    //     let newFilter = [...state.mainProducts];
    //     newFilter = shopFilter(newFilter, payload, state.order);
    //     return {
    //       ...state,
    //       shopFilter: payload === "ALLS" ? "" : payload,
    //       products: [...newFilter],
    //     };
    //   }

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
