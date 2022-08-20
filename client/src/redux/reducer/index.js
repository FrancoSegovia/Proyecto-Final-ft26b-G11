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

  QUERY_PRODUCTS,

  OWNER_DETAIL,
  OWNER_SHOPS,
  ALL_OWNERS

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
    isBanned:false
  },
  _id: "",
  users: [],
  owners:[],
  deliverys:[],
  modalProducts: [],
  owner:{},
  ownerShops:[]

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

    case QUERY_PRODUCTS: {
      return {
        ...state,
        modalProducts: payload,
      }
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
    
    case OWNER_DETAIL:
      return {
        ...state,
        owner: payload,
    };

    case OWNER_SHOPS:
      console.log("CUACK CUACK");
      return {
        ...state,
        ownerShops: payload
  };

    case ALL_OWNERS:
        return {
          ...state,
          owners: payload
    };
  
    /////////////////////////////////////////////////

    case GET_SHOPPINGCART:
      console.log(payload)
      return {
        ...state,
        cart: payload,
      };

      case ADD_SHOPPINGCART:
        let newCart = [...state.cart, payload];
        localStorage.setItem("cart", JSON.stringify(newCart));
        return {
          ...state,
          cart: [...state.cart, payload],
        };
      // case ADD_SHOPPINGCART:
      //   return {
      //     ...state,
      //     cart: [...payload],
      //   };
      
    case DELETE_SHOPPINGCART:
      let newCart2 = JSON.parse(localStorage.getItem("cart"));
      newCart2 = newCart2.filter((p) => p._id !== payload);
      localStorage.setItem("cart", JSON.stringify(newCart2));
      const updatedCart = state.cart.filter((p) => p._id !== payload);
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
          lastName: data.lastname,
          eMail: data.email,
          phone: data.phone ? data.phone : null,
          vehicle: data.vehicle ? data.vehicle : "",
          isBanned:data.isBanned
        },
      };
    }

    case SIGN_OUT:
      localStorage.removeItem("token");
      localStorage.removeItem("type");
      localStorage.removeItem("cart");
      localStorage.removeItem("total");

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
          isBanned:false
        },
      };

    /////////////////////////////////////////////////

    default:
      return state;
  }
};

export default reducer;