import axios from "axios";

export const ALL_SHOPS = "ALL_SHOPS";
export const QUERY_SHOPS = "QUERY_SHOPS";
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
export const USER_LOADED = "USER_LOADED";
export const SIGN_IN = "SIGN_IN";

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
export const signUpOwner = (user) => {
  return (dispatch) => {
    axios
      .post("http://localhost:3001/signup/owner", user)
      .then((token) => {
        localStorage.setItem("token", token.data);

        dispatch({
          type: SIGN_UP,
          payload: token.data,
        });
      })
      .catch((error) => console.error(error.message));
  };
};

export const signUpUser = (user) => {
  return (dispatch) => {
    axios
      .post("http://localhost:3001/signup/user", user)
      .then((token) => {
        localStorage.setItem("token", token.data);

        dispatch({
          type: SIGN_UP,
          payload: token.data,
        });
      })
      .catch((error) => console.error(error.message));
  };
};

export const signIn = (creds) => {
  return (dispatch) => {
    axios
      .post("http://localhost:3001/signin", creds)
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

export const loadUser = () => {
  return (dispatch, getState ) => {
    const token = getState().state.user.token;
    if (token) {
      dispatch({
        type: USER_LOADED,
        payload: token 
      })
    } else return null;
  }
}