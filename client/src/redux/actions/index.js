import axios from "axios";
import jwtDecode from "jwt-decode";
import {toast} from "react-toastify"
import swal from 'sweetalert'
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
export const GET_SHOPPINGCART = "GET_SHOPPINGCART";
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
export const OWNER_DETAIL = "OWNER_DETAIL";
export const OWNER_SHOPS= "OWNER_SHOPS";

export const getAllShops = () => (dispatch) => {
  return axios
    .get("http://localhost:3001/account/user/local")
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
    .get(`http://localhost:3001/account/user/local?name=${query}`)
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
      var respuesta = await axios.post(`http://localhost:3001/account/owner/local/add_local`, payload, setHeaders());
      return respuesta;
    } catch (error) {
      console.error(error);
    }
  };
}

export const deleteShop = (id) => {
  console.log("Llegué hasta acá y no hice un chori");
  return axios
    .delete(`http://localhost:3001/account/admin/local/${id}`, setHeaders())
    .catch((error) => console.error(error.message));
};


//Hay que pasar la function de arriba como promesa
// export const addcosa = (paylaod) => {
//   return axios.post(`http://localhost:3001/account/owner/local`, payload)
//   .then()
//   .catch(error => console.error(error.message))
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

export const deleteUser = (id) => {
  return axios
    .delete(`http://localhost:3001/account/admin/users/${id}`)
    .catch((error) => console.error(error.message));
};

export const getOwnerDetails = (dispatch) => {
  return axios
    .get(`http://localhost:3001/account/owner/currentOwner`, setHeaders())
    .then((owner) => {
      console.log(owner.data)
      dispatch({
        type: OWNER_DETAIL,
        payload: owner.data,
      });
    })
    .catch((error) => console.error(error.message));
};

export const getOwnerShops = (id) => (dispatch) => {
  console.log("buenas buenasss")
  return axios
    .get(`http://localhost:3001/account/owner/local/${id}`, setHeaders())
    .then((shops) => {
      console.log("Sos un puto");
      dispatch({
        type: OWNER_SHOPS,
        payload: shops.data,
      });
    })
    .catch((error) => console.error(error.message, "JAJAAAAAAAAA"));
};

export const deleteProduct = (id) => {
  return axios
    .delete(`http://localhost:3001/account/owner/local/product/${id}`)
    .catch((error) => console.error(error.message));
};


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
export const getShoppingCart = () => {
  let cart = JSON.parse(localStorage.getItem("cart"));
  return {
    type: GET_SHOPPINGCART,
    payload: cart,
  }
}

export const addShoppingCart = (product) => {
  return {
    type: ADD_SHOPPINGCART,
    payload: product,
  }
}
export const deleteShoppingCart = (id) => {
  return {
    type: DELETE_SHOPPINGCART,
    payload: id,
  }
}

// export const getShoppingCart = () => (dispatch) => {
//   const token = jwtDecode(localStorage.getItem("token"))
//   return axios
//     .get(`http://localhost:3001/account/cart/products-cart/${token._id}`)
//     .then((products) => {
//       console.log(products.data)
//       dispatch({
//         type: GET_SHOPPINGCART,
//         payload: products.data,
//       });
//     })
//     .catch((error) => console.error(error.message));
// };

// export const addShoppingCart = (id) => (dispatch) => {
//   const token = jwtDecode(localStorage.getItem("token"))
//   return axios
//     .post(`http://localhost:3001/account/cart/products-cart/${token._id}`, {id:id})
//     .then((product) => {
//       console.log(product.data)
//       dispatch({
//         type: ADD_SHOPPINGCART,
//         payload: product.data,
//       });
//     })
//     .catch((error) => console.error(error));
// };

// export const deleteShoppingCart = (id) => (dispatch) => {
//   const token = jwtDecode(localStorage.getItem("token"))
//   return axios
//     .delete(`http://localhost:3001/account/cart/products-cart/${token._id}`, id)
//     .then((product) => {
//       dispatch({
//         type: DELETE_SHOPPINGCART,
//         payload: id,
//       });
//     })
//     .catch((error) => console.error(error));
// };

////////////////////////////////////////////////
export const  paymentFuncion = (id, amount) => {
  return axios.post("http://localhost:3001/account/pay", {id, amount})
  .then((message) =>{ 
    localStorage.setItem("cart", JSON.stringify([]))
    console.log(message.data.message)
    swal("Good job!", message.data.message, "success")
    // toast(message.data.message, {position: toast.POSITION.BOTTON_RIGHT})
  })
  .catch((error) => swal("Ha ocurrido un error!", error.message.message, "error"))
}

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
      .post("http://localhost:3001/account/login", creds)
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

/////////////////////////////////////////////////

export const errorCleaner = () => {
  return {
    type: ERROR_CLEANER,
    payload: false,
  };
};
