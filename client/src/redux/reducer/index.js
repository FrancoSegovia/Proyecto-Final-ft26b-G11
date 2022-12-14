import jwtDecode from "jwt-decode";
import swal from "sweetalert";
import shopOrder from "../../utils/functions/shopOrder";
import shopFilter from "../../utils/functions/shopFilter";

import {
  //shared
  SIGN_IN,
  SIGN_OUT,
  ALL_SHOPS,
  ORDER_SHOPS,
  FILTER_SHOPS,
  QUERY_SHOPS,
  QUERY_ERROR,
  QUERY_PRODUCTS,
  ERROR_CLEANER,
  //shared
  //user
  USER_GET_ORDERS,
  USER_GET_SHOPPINGCART,
  USER_ADD_SHOPPINGCART,
  USER_AMOUNT_SHOPPINGCART,
  USER_DELETE_SHOPPINGCART,
  USER_CLEAR_SHOPPINGCART,
  //user
  //delivery
  DELIVERY_ALL_ORDERS,
  DELIVERY_ORDER,
  //delivery
  //owner
  OWNER_DETAIL,
  OWNER_SHOPS,
  //owner
  //admin
  ADMIN_ALL_USERS,
  ADMIN_ALL_DELIVERY,
  ADMIN_ALL_OWNERS,
  //admin
  GET_PROFILE,
  ORDER_PRODUCTS,
  FILTER_PRODUCTS,
} from "../actions";

const initialState = {
  profiles: [],
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
    isBanned: false,
  },
  _id: "",
  users: [],
  orders: [],
  owners: [],
  deliverys: [],
  modalProducts: [],
  owner: {},
  ownerShops: [],
  deliveryOrders: {},
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGN_IN: {
      const data = jwtDecode(payload);
      if (data)
        swal("¡Bienvenido!", "Sesión iniciada correctamente.", "success", {
          timer: "2000",
          buttons: false,
        });
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
          isBanned: data.isBanned,
        },
      };
    }

    case SIGN_OUT:
      localStorage.removeItem("token");
      localStorage.removeItem("type");
      localStorage.removeItem("cart");
      localStorage.removeItem("total");
      swal("Hasta pronto!", "Usted ha cerrado sesión.", "success", {
        timer: "2000",
        buttons: false,
      });
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
          isBanned: false,
          orders: [],
        },
      };

    case ALL_SHOPS: {
      return {
        ...state,
        mainShops: payload,
        shops: payload,
      };
    }

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
      };
    }

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

    case USER_GET_ORDERS:
      return {
        ...state,
        orders: [...payload],
      };

    case USER_GET_SHOPPINGCART:
      localStorage.setItem("cart", JSON.stringify([...payload]));
      return {
        ...state,
        cart: [...payload],
      };

    case USER_ADD_SHOPPINGCART:
      localStorage.setItem("cart", JSON.stringify([...payload]));
      return {
        ...state,
        cart: [...payload],
      };

    case USER_AMOUNT_SHOPPINGCART:
      localStorage.setItem("cart", JSON.stringify([...payload]));
      return {
        ...state,
        cart: [...payload],
      };

    case USER_DELETE_SHOPPINGCART:
      localStorage.setItem("cart", JSON.stringify([...payload]));
      return {
        ...state,
        cart: [...payload],
      };

    case USER_CLEAR_SHOPPINGCART:
      localStorage.setItem("cart", JSON.stringify([]));
      return {
        ...state,
        cart: [...payload],
      };

    case DELIVERY_ALL_ORDERS: {
      return {
        ...state,
        orders: payload,
      };
    }

    case DELIVERY_ORDER:
      return {
        ...state,
        deliveryOrders: payload,
      };

    case OWNER_DETAIL:
      return {
        ...state,
        owner: payload,
      };

    case OWNER_SHOPS:
      return {
        ...state,
        ownerShops: payload,
      };

    case ADMIN_ALL_USERS: {
      return {
        ...state,
        users: payload,
      };
    }
    case ADMIN_ALL_OWNERS:
      return {
        ...state,
        owners: payload,
      };

    case ADMIN_ALL_DELIVERY:
      return {
        ...state,
        deliverys: payload,
      };

    case GET_PROFILE:
      if (state.profiles.find((p) => p.login.includes(payload.login))) {
        return {
          ...state,
        };
      } else {
        return {
          ...state,
          profiles: [...state.profiles, payload],
        };
      }

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

    default:
      return state;
  }
};

export default reducer;
