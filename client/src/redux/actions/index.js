import axios from "axios";
import jwtDecode from "jwt-decode";
import swal from "sweetalert";
import { setHeaders } from "../../api";

export const ALL_SHOPS = "ALL_SHOPS";
export const QUERY_SHOPS = "QUERY_SHOPS";
export const QUERY_PRODUCTS = "QUERY_PRODUCTS";
/////////////////////////////////////////////////
export const ALL_USERS = "ALL_USERS";
export const GET_USER_ODERS = "GET_USER_ODERS";
/////////////////////////////////////////////////
export const ORDER_SHOPS = "ORDER_SHOPS";
export const FILTER_SHOPS = "FILTER_SHOPS";
export const ORDER_PRODUCTS = "ORDER_PRODUCTS";
export const FILTER_PRODUCTS = "FILTER_PRODUCTS";
/////////////////////////////////////////////////
export const GET_SHOPPINGCART = "GET_SHOPPINGCART";
export const ADD_SHOPPINGCART = "ADD_SHOPPINGCART";
export const DELETE_SHOPPINGCART = "DELETE_SHOPPINGCART";
export const CLEAR_SHOPPINGCART = "CLEAR_SHOPPINGCART";
export const ADD_PRODUCT_SHOPPINGCART = "ADD_PRODUCT_SHOPPINGCART";
export const SUBSTRACT_PRODUCT_SHOPPINGCART = "SUBSTRACT_PRODUCT_SHOPPINGCART";
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
export const OWNER_SHOPS = "OWNER_SHOPS";
export const ALL_OWNERS = "ALL_OWNERS";
////////////////////////////////////////////////
export const ALL_DELIVERY = "ALL_DELIVERY";

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

export const getQueryProducts = (query, id) => (dispatch) => {
  return axios
    .get(
      `http://localhost:3001/account/user/local/products/${id}?name=${query}`,
      setHeaders()
    )
    .then((products) => {
      dispatch({
        type: QUERY_PRODUCTS,
        payload: products.data,
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
      let respuesta = await axios.post(
        `http://localhost:3001/account/owner/local/add_local`,
        payload,
        setHeaders()
      );
      swal("¡Éxito!", "La tienda ha sido creada correctamente.", "success", {
        timer: "2000",
        buttons: false,
      });
      return respuesta;
    } catch (error) {
      console.error(error);
    }
  };
}

export const addProduct = (payload) => {
  return axios
    .post(
      `http://localhost:3001/account/owner/local/add_product`,
      payload,
      setHeaders()
    )
    .then((exit) =>
      swal("¡Éxito!", "El producto se ha añadido correctamente.", "success", {
        timer: "2000",
        buttons: false,
      })
    )
    .catch((error) => console.error(error.message));
};

export const updateUser = (payload, id) => {
  return axios
    .put(
      `http://localhost:3001/account/user/currentUser/update/${id}`,
      payload,
      setHeaders()
    )
    .then((exit) =>
      swal(
        "¡Éxito!",
        "El usuario ha sido actualizado correctamente.",
        "success",
        { timer: "2000", buttons: false }
      )
    )
    .catch((error) => console.error(error.message));
};

export const getAllUsers = () => (dispatch) => {
  return axios
    .get("http://localhost:3001/account/admin/users", setHeaders())
    .then((users) => {
      dispatch({
        type: ALL_USERS,
        payload: users.data,
      });
    })
    .catch((error) => console.error(error.message));
};

export const getUserOrders = (id) => (dispatch) => {
  return axios.get(`http://localhost:3001/account/delivery/destination/orders/${id}`, setHeaders())
  .then((orders) => {
    dispatch(({
      type:GET_USER_ODERS,
      payload: orders.data
    }))
  }).catch((error) => console.error(error.message));
}

export const getAllClickers = () => (dispatch) => {
  return axios
    .get(`http://localhost:3001/account/admin/delivery`, setHeaders())
    .then((clickers) => {
      dispatch({
        type: ALL_DELIVERY,
        payload: clickers.data,
      });
    })
    .catch((error) => console.error(error.message));
};

export const getAllOwners = () => (dispatch) => {
  return axios
    .get(`http://localhost:3001/account/admin/owner`, setHeaders())
    .then((owners) => {
      dispatch({
        type: ALL_OWNERS,
        payload: owners.data,
      });
    })
    .catch((error) => console.error(error.message));
};

export const getOwnerDetails = (dispatch) => {
  return axios
    .get(`http://localhost:3001/account/owner/currentOwner`, setHeaders())
    .then((owner) => {
      dispatch({
        type: OWNER_DETAIL,
        payload: owner.data,
      });
    })
    .catch((error) => console.error(error.message));
};

export const getOwnerShops = (id) => (dispatch) => {
  return axios
    .get(`http://localhost:3001/account/owner/local/${id}`, setHeaders())
    .then((shops) => {
      dispatch({
        type: OWNER_SHOPS,
        payload: shops.data,
      });
    })
    .catch((error) => console.error(error.message));
};

/////////////////////////////////////////////////

export const deleteUser = (id) => {
  return axios
    .delete(`http://localhost:3001/account/admin/user/${id}`, setHeaders())
    .then(() => {
      swal("¡Éxito!", "El usuario ha sido vetado.", "info", {
        timer: "2000",
        buttons: false,
      });
    })
    .catch((error) => console.error(error.message));
};

export const deleteOwner = (id) => {
  return axios
    .delete(`http://localhost:3001/account/admin/owner/${id}`, setHeaders())
    .then(() => {
      swal("¡Éxito!", "El dueño ha sido vetado.", "info", {
        timer: "2000",
        buttons: false,
      });
    })
    .catch((error) => console.error(error.message));
};

export const deleteClicker = (id) => {
  return axios
    .delete(`http://localhost:3001/account/admin/delivery/${id}`, setHeaders())
    .then(() => {
      swal("¡Éxito!", "El Clicker ha sido vetado.", "info", {
        timer: "2000",
        buttons: false,
      });
    })
    .catch((error) => console.error(error.message));
};

export const deleteShop = (id) => {
  return axios
    .delete(`http://localhost:3001/account/admin/local/${id}`, setHeaders())
    .then((exit) =>
      swal(
        "¡Éxito!",
        "El negocio ha sido eliminado correctamente.",
        "success",
        { timer: "2000", buttons: false }
      )
    )
    .catch((error) => console.error(error.message));
};

export const deleteProduct = (id) => {
  return axios
    .delete(
      `http://localhost:3001/account/owner/local/product/${id}`,
      setHeaders()
    )
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

export const getShoppingCart = () => (dispatch) => {
  const token = jwtDecode(localStorage.getItem("token"));
  return axios
    .get(`http://localhost:3001/account/cart/user-cart/${token._id}`)
    .then((products) => {
      dispatch({
        type: GET_SHOPPINGCART,
        payload: products.data[0].products,
      });
    })
    .catch((error) => console.error(error.message));
};

export const addShoppingCart = (_id) => (dispatch) => {
  const token = jwtDecode(localStorage.getItem("token"));
  return axios
    .put(`http://localhost:3001/account/cart/products-cart/${token._id}`, {
      _id,
    })
    .then((products) => {
      dispatch({
        type: ADD_SHOPPINGCART,
        payload: products.data[0].products,
      });
    })
    .catch((error) => console.error(error));
};

export const deleteShoppingCart = (idP) => (dispatch) => {
  const token = jwtDecode(localStorage.getItem("token"));
  return axios
    .delete(`http://localhost:3001/account/cart/products-cart/${token._id}`, {
      data: { idP: idP },
    })
    .then((products) => {
      dispatch({
        type: DELETE_SHOPPINGCART,
        payload: products.data[0].products,
      });
    })
    .catch((error) => console.error(error));
};

export const clearShoppingCart = () => (dispatch) => {
  const token = jwtDecode(localStorage.getItem("token"));
  return axios
    .delete(`http://localhost:3001/account/cart/clear-cart/${token._id}`)
    .then((products) => {
      dispatch({
        type: CLEAR_SHOPPINGCART,
        payload: products.data[0].products,
      });
    })
    .catch((error) => console.error(error));
};

////////////////////////////////////////////////

export const paymentFuncion = (id, amount, user) => {
  return axios
    .post("http://localhost:3001/account/pay", { id, amount, user })
    .then((message) => {
      localStorage.setItem("cart", JSON.stringify([]));
      swal("Perfecto!", message.data.message, "success");
    })
    .catch((error) => {
      swal("Ha ocurrido un error!", error.message, "error");
      console.error(error.message);
    });
};

////////////////////////////////////////////////

export function signUpOwner({ name, lastname, email, password }) {
  return async function () {
    try {
      let respuesta = await axios.post(
        "http://localhost:3001/account/owner/signup",
        { name, lastname, email, password }
      );
      swal("¡Éxito!", "Usted se ha registrado correctamente.", "success", {
        timer: "2000",
        buttons: false,
      });
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
      swal("¡Éxito!", "Usted se ha registrado correctamente.", "success", {
        timer: "2000",
        buttons: false,
      });
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
        "http://localhost:3001/account/delivery/signup",
        user
      );
      swal("¡Éxito!", "Usted se ha registrado correctamente.", "success", {
        timer: "2000",
        buttons: false,
      });
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
        if(!token.data || token.data === "") throw "Usuario invalido o no Registrado";
        localStorage.setItem("token", token.data);
        dispatch({
          type: SIGN_IN,
          payload: token.data,
        });
      })
      .catch((error) => {
        swal("¡Error!", error, "error", {
          timer: "2000",
          buttons: false,
        });
        console.error(error)
      });
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
