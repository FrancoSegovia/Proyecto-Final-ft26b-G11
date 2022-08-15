import axios from "axios";
import { setHeaders } from "../../api";

export const ALL_SHOPS = "ALL_SHOPS";
export const QUERY_SHOPS = "QUERY_SHOPS";

export const ALL_USERS = "ALL_USERS";
/////////////////////////////////////////////////
export const ORDER_SHOPS = "ORDER_SHOPS";
export const FILTER_SHOPS = "FILTER_SHOPS";
export const ORDER_PRODUCTS = "ORDER_PRODUCTS";
export const FILTER_PRODUCTS = "FILTER_PRODUCTS";
/////////////////////////////////////////////////
export const ADD_SHOPPINGCART = "ADD_SHOPPINGCART";
export const DELETE_SHOPPINGCART = "DELETE_SHOPPINGCART";
/////////////////////////////////////////////////
export const QUERY_ERROR = "QUERY_ERROR";
export const ERROR_CLEANER = "ERROR_CLEANER";
////////////////////////////////////////////////
export const SIGN_UP = "SIGN_UP";
export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";
export const USER_LOADED = "USER_LOADED";
////////////////////////////////////////////////

export const getAllShops = () => (dispatch) => {
  return axios
    .get("http://localhost:3001/local")
    .then((shops) => {
      dispatch({
        type: ALL_SHOPS,
        payload: shops.data,
      });
    })
    .catch((error) => console.error(error.message));
};

export const getQueryShops = (query) => (dispatch) => {
  return axios
    .get(`http://localhost:3001/local?name=${query}`)
    .then((shops) => {
      dispatch({
        type: QUERY_SHOPS,
        payload: shops.data,
      });
    })
    .catch((error) => {
      console.error(error.message);
      dispatch({
        type: QUERY_ERROR,
        payload: true,
      });
    });
};

export function addStore(payload) {
  return async function () {
    try {
      var respuesta = await axios.post(`http://localhost:3001/local`, payload);
      return respuesta;
    } catch (error) {
      console.error(error);
    }
  };
}
//Hay que pasar la function de arriba como promesa
// export const addcosa = (paylaod) => {
//   return axios.post(`http://localhost:3001/local`, payload)
//   .then()
// }

export const getAllUsers = (dispatch) => {
  return axios
    .get("http://localhost:3001/account/admin/users")
    .then((users) => {
      dispatch({
        type: ALL_USERS,
        payload: users.data,
      });
    })
    .catch((error) => console.error(error.message));
};

/////////////////////////////////////////////////

export const orderShops = (value) => {
  return {
    type: ORDER_SHOPS,
    payload: value,
  };
};

export const filterShops = (value) => {
  return {
    type: FILTER_SHOPS,
    payload: value,
  };
};

export const orderProducts = (value) => {
  return {
    type: ORDER_PRODUCTS,
    payload: value,
  };
};

export const filterProducts = (value) => {
  return {
    type: FILTER_PRODUCTS,
    payload: value,
  };
};

/////////////////////////////////////////////////
export const addShoppingCart = (id) => {
  return {
    type: ADD_SHOPPINGCART,
    payload: id,
  };
};
// export const addShoppingCart = (id) => (dispatch) => {
//   return axios
//    .post(path, id)
//    .then((product) => {
//      dispath({
//        type: ADD_SHOPPINGCART,
//        payload: product.data
//      })
//    .catch(error => console.error(error))
// })
// }

export const deleteShoppingCart = (id) => {
  console.log(id);
  return {
    type: DELETE_SHOPPINGCART,
    payload: id,
  };
};
/////////////////////////////////////////////////

export const errorCleaner = () => {
  return {
    type: ERROR_CLEANER,
    payload: false,
  };
};

////////////////////////////////////////////////

export function signUpOwner({ name, lastname, email, password }) {
  return async function () {
    try {
      let respuesta = await axios.post(
        "http://localhost:3001/account/owner/signup",
        { name, lastname, email, password }
      );
      return respuesta;
    } catch (error) {
      console.error(error);
    }
  };
}

export function signUpUser(user) {
  return async function () {
    try {
      let respuesta = await axios.post(
        "http://localhost:3001/account/user/signup",
        user
      );
      return respuesta;
    } catch (error) {
      console.error(error);
    }
  };
}

export function signUpDelivery(user) {
  return async function () {
    try {
      let respuesta = await axios.post(
        "http://localhost:3001/account/signup/delivery",
        user
      );
      return respuesta;
    } catch (error) {
      console.error(error);
    }
  };
}

export const signIn = (creds) => {
  return (dispatch) => {
    axios
      .post("http://localhost:3001/account/user/login", creds)
      .then((token) => {
        localStorage.setItem("token", token.data);
        dispatch({
          type: SIGN_IN,
          payload: token.data,
        });
      })
      .catch((error) => console.error(error.message));
  };
};

export const signOut = () => {
  return (dispatch) => {
    dispatch({
      type: SIGN_OUT,
    });
  };
};
