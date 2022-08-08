import axios from "axios";

export const ALL_SHOPS = "ALL_SHOPS";
export const QUERY_SHOPS = "QUERY_SHOPS";
/////////////////////////////////////////////////
export const ORDER_SHOPS = "ORDER_SHOPS";
export const FILTER_SHOPS = "FILTER_SHOPS";
export const ORDER_PRODUCTS = "ORDER_PRODUCTS";
export const FILTER_PRODUCTS = "FILTER_PRODUCTS";
/////////////////////////////////////////////////
export const QUERY_ERROR = "QUERY_ERROR";
export const ERROR_CLEANER = "ERROR_CLEANER";

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
      console.log(error.message);
      dispatch({
        type: QUERY_ERROR,
        payload: true,
      });
    });
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

export const errorCleaner = () => {
  return {
    type: ERROR_CLEANER,
    payload: false,
  };
};

export function addStore(payload) {
  return async function (){
    try {
      var respuesta = await axios.post(`http://localhost:3001/local`, payload);
      return respuesta;
    } catch (error) {
      console.log(error);
    }
    
  };
}
