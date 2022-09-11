import axios from "axios";
import jwtDecode from "jwt-decode";
import swal from "sweetalert";
import { setHeaders } from "../../api";

//SHARED///////////////////////////////////////////////////////////////////////
export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";
export const ALL_SHOPS = "ALL_SHOPS";
export const ORDER_SHOPS = "ORDER_SHOPS";
export const FILTER_SHOPS = "FILTER_SHOPS";
export const QUERY_SHOPS = "QUERY_SHOPS";
export const QUERY_ERROR = "QUERY_ERROR";
export const QUERY_PRODUCTS = "QUERY_PRODUCTS";
export const ERROR_CLEANER = "ERROR_CLEANER";
//SHARED///////////////////////////////////////////////////////////////////////

//USER/////////////////////////////////////////////////////////////////////////
export const USER_GET_ORDERS = "USER_GET_ORDERS";
export const USER_GET_SHOPPINGCART = "USER_GET_SHOPPINGCART";
export const USER_ADD_SHOPPINGCART = "USER_ADD_SHOPPINGCART";
export const USER_AMOUNT_SHOPPINGCART = "USER_AMOUNT_SHOPPINGCART";
export const USER_DELETE_SHOPPINGCART = "USER_DELETE_SHOPPINGCART";
export const USER_CLEAR_SHOPPINGCART = "USER_CLEAR_SHOPPINGCART";
//USER/////////////////////////////////////////////////////////////////////////

//DELIVERY/////////////////////////////////////////////////////////////////////
export const DELIVERY_ALL_ORDERS = "DELIVERY_ALL_ORDERS";
export const DELIVERY_ORDER = "DELIVERY_ORDER";
//DELIVERY/////////////////////////////////////////////////////////////////////

//OWNER////////////////////////////////////////////////////////////////////////
export const OWNER_DETAIL = "OWNER_DETAIL";
export const OWNER_SHOPS = "OWNER_SHOPS";
//OWNER////////////////////////////////////////////////////////////////////////

//ADMIN////////////////////////////////////////////////////////////////////////
export const ADMIN_ALL_USERS = "ADMIN_ALL_USERS";
export const ADMIN_ALL_DELIVERY = "ADMIN_ALL_DELIVERY";
export const ADMIN_ALL_OWNERS = "ADMIN_ALL_OWNERS";
//ADMIN////////////////////////////////////////////////////////////////////////

//EXTRA////////////////////////////////////////////////////////////////////////
export const GET_PROFILE = "GET_PROFILE";
//EXTRA////////////////////////////////////////////////////////////////////////

//SHAREDACTIONS///////////////////////////////////////////////////
export function signUpOwner({ name, lastname, email, password }) {
  //all users
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
  //all users
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
  //all users
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
  //all users
  return (dispatch) => {
    axios
      .post("http://localhost:3001/account/login", creds)
      .then((token) => {
        if (!token.data || token.data === "")
          throw "Usuario invalido o no Registrado";
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
        console.error(error);
      });
  };
};

export const signOut = () => {
  //all users
  return (dispatch) => {
    dispatch({
      type: SIGN_OUT,
    });
  };
};

export const getAllShops = () => (dispatch) => {
  //user - delivery - admin
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

export const orderShops = (value) => {
  //user - owner
  return {
    type: ORDER_SHOPS,
    payload: value,
  };
};

export const filterShops = (value) => {
  //user - owner
  return {
    type: FILTER_SHOPS,
    payload: value,
  };
};

export const getQueryProducts = (query, id) => (dispatch) => {
  //user - owner
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

export const getQueryShops = (query) => (dispatch) => {
  //user - owner
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

export const errorCleaner = () => {
  //user - owner
  return {
    type: ERROR_CLEANER,
    payload: false,
  };
};
//SHAREDACTIONS///////////////////////////////////////////////////

//USERACTIONS/////////////////////////////////////////////////////

export const getUserOrders = (id) => (dispatch) => {
  //user
  return axios
    .get(
      `http://localhost:3001/account/delivery/destination/orders/${id}`,
      setHeaders()
    )
    .then((orders) => {
      dispatch({
        type: USER_GET_ORDERS,
        payload: orders.data,
      });
    })
    .catch((error) => console.error(error.message));
};

export const getShoppingCart = () => (dispatch) => {
  //user
  const token = jwtDecode(localStorage.getItem("token"));
  return axios
    .get(`http://localhost:3001/account/cart/user-cart/${token._id}`)
    .then((products) => {
      console.log(products.data);
      dispatch({
        type: USER_GET_SHOPPINGCART,
        payload: products.data,
      });
    })
    .catch((error) => console.error(error.message));
};

export const addShoppingCart = (_id) => (dispatch) => {
  //user
  const token = jwtDecode(localStorage.getItem("token"));
  return axios
    .put(`http://localhost:3001/account/cart/products-cart/${token._id}`, {
      _id,
    })
    .then((products) => {
      console.log(products.data);
      dispatch({
        type: USER_ADD_SHOPPINGCART,
        payload: products.data,
      });
    })
    .catch((error) => console.error(error));
};

export const amountShoppingCart = (_id, amount) => (dispatch) => {
  //user
  const token = jwtDecode(localStorage.getItem("token"));
  return axios
    .put(`http://localhost:3001/account/cart/products-amount/${token._id}`, {
      _id,
      amount,
    })
    .then((products) => {
      dispatch({
        type: USER_AMOUNT_SHOPPINGCART,
        payload: products.data,
      });
    })
    .catch((error) => console.error(error));
};

export const deleteShoppingCart = (idP) => (dispatch) => {
  //user
  const token = jwtDecode(localStorage.getItem("token"));
  return axios
    .delete(`http://localhost:3001/account/cart/products-cart/${token._id}`, {
      data: { idP: idP },
    })
    .then((products) => {
      dispatch({
        type: USER_DELETE_SHOPPINGCART,
        payload: products.data,
      });
    })
    .catch((error) => console.error(error));
};

export const clearShoppingCart = () => (dispatch) => {
  //user
  const token = jwtDecode(localStorage.getItem("token"));
  return axios
    .delete(`http://localhost:3001/account/cart/clear-cart/${token._id}`)
    .then((products) => {
      dispatch({
        type: USER_CLEAR_SHOPPINGCART,
        payload: products.data[0].products,
      });
    })
    .catch((error) => console.error(error));
};

export const paymentFuncion = (id, amount, user) => {
  //user
  return axios
    .post("http://localhost:3001/account/pay", { id, amount, user })
    .then((message) => {
      localStorage.setItem("cart", JSON.stringify([]));
      swal("Perfecto!", message.data.message, "success");
    })
    .catch((error) => {
      swal("Ha ocurrido un error!", "Inténtelo de nuevo más tarde.", "error");
      console.error(error.message);
    });
};

export const updateUser = (payload, id) => {
  //user
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
//USERACTIONS/////////////////////////////////////////////////////

//DELIVERYACTIONS/////////////////////////////////////////////////
export const getAllOrders = () => (dispatch) => {
  //delivery
  return axios
    .get(`http://localhost:3001/account/delivery/destination`, setHeaders())
    .then((orders) => {
      dispatch({
        type: DELIVERY_ALL_ORDERS,
        payload: orders.data,
      });
    })
    .catch((error) => console.error(error.message));
};

export const updateState = (idO) => () => {
  //delivery
  const idD = jwtDecode(localStorage.getItem("token"))._id;
  return axios
    .put(
      `http://localhost:3001/account/delivery/destination/state`,
      { idO, idD },
      setHeaders()
    )
    .then((exit) => {
      swal("¡Éxito!", "El encargo ha sido asignado con éxito.", "success", {
        timer: "2000",
        buttons: false,
      });
    })
    .catch((error) => console.error(error.message));
};

export const deleteOrder = (idO, idU) => () => {
  //delivery
  const idD = jwtDecode(localStorage.getItem("token"))._id;
  return axios
    .delete(
      `http://localhost:3001/account/delivery/destination/received/${idD}?idO=${idO}&idU=${idU}`,
      setHeaders()
    )
    .then((exit) => {
      swal("¡Éxito!", "El encargo ha sido completado.", "success", {
        timer: "2000",
        buttons: false,
      });
    })
    .catch((error) => console.error(error.message));
};

export const getDeliveryOrders = (id) => (dispatch) => {
  //delivery
  return axios
    .get(
      `http://localhost:3001/account/delivery/destination/${id}`,
      setHeaders()
    )
    .then((deliveryOrders) => {
      dispatch({
        type: DELIVERY_ORDER,
        payload: deliveryOrders.data,
      });
    })
    .catch((error) => console.error(error.message));
};
//DELIVERYACTIONS/////////////////////////////////////////////////

//OWNERACTIONS////////////////////////////////////////////////////
export const getOwnerDetails = (dispatch) => {
  //owner
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
  //owner
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

export function addStore(payload) {
  //owner
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
  //owner
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
//OWNERACTIONS////////////////////////////////////////////////////

//ADMINACTIONS////////////////////////////////////////////////////
export const getAllUsers = () => (dispatch) => {
  //admin
  return axios
    .get("http://localhost:3001/account/admin/users", setHeaders())
    .then((users) => {
      dispatch({
        type: ADMIN_ALL_USERS,
        payload: users.data,
      });
    })
    .catch((error) => console.error(error.message));
};

export const getAllClickers = () => (dispatch) => {
  //admin
  return axios
    .get(`http://localhost:3001/account/admin/delivery`, setHeaders())
    .then((clickers) => {
      dispatch({
        type: ADMIN_ALL_DELIVERY,
        payload: clickers.data,
      });
    })
    .catch((error) => console.error(error.message));
};

export const getAllOwners = () => (dispatch) => {
  //admin
  return axios
    .get(`http://localhost:3001/account/admin/owner`, setHeaders())
    .then((owners) => {
      dispatch({
        type: ADMIN_ALL_OWNERS,
        payload: owners.data,
      });
    })
    .catch((error) => console.error(error.message));
};

export const deleteUser = (id) => {
  //admin
  return axios
    .delete(`http://localhost:3001/account/admin/users/${id}`, setHeaders())
    .then(() => {
      swal("¡Éxito!", "El usuario ha sido vetado.", "info", {
        timer: "2000",
        buttons: false,
      });
    })
    .catch((error) => console.error(error.message));
};

export const deleteClicker = (id) => {
  //admin
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

export const deleteOwner = (id) => {
  //admin
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

export const deleteShop = (id) => {
  //admin
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
  //admin
  return axios
    .delete(
      `http://localhost:3001/account/owner/local/product/${id}`,
      setHeaders()
    )
    .catch((error) => console.error(error.message));
};
//ADMINACTIONS////////////////////////////////////////////////////

//EXTRAACTIONS////////////////////////////////////////////////////
export const getProfiles = (username) => (dispatch) => {
  return axios
    .get(`https://api.github.com/users/${username}`)
    .then((profiles) => {
      dispatch({
        type: GET_PROFILE,
        payload: profiles.data,
      });
    })
    .catch((error) => console.error(error.message));
};
//EXTRAACTIONS////////////////////////////////////////////////////

//NOUSED//////////////////////////////////////////////////////////
export const FILTER_PRODUCTS = "FILTER_PRODUCTS";
export const ORDER_PRODUCTS = "ORDER_PRODUCTS";

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
//NOUSED//////////////////////////////////////////////////////////
