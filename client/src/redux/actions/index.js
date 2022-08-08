import axios from "axios";

export const ALL_PRODUCTS = "ALL_PRODUCTS";
export const QUERY_PRODUCTS = "QUERY_PRODUCTS";
/////////////////////////////////////////////////
export const ORDER_PRODUCTS = "ORDER_PRODUCTS";
export const FILTER_PRODUCTS = "FILTER_PRODUCTS";
/////////////////////////////////////////////////
export const QUERY_ERROR = "QUERY_ERROR";
export const ERROR_CLEANER = "ERROR_CLEANER";

export const getAllProducts = () => (dispatch) => {
  return axios
    .get("http://localhost:3001/mockup")
    .then((products) => {
      dispatch({
        type: ALL_PRODUCTS,
        payload: products.data,
      });
    })
    .catch((error) => console.error(error.message));
};

export const getQueryProducts = (query) => (dispatch) => {
  return axios
    .get(`http://localhost:3001/mockup?name=${query}`)
    .then((products) => {
      dispatch({
        type: QUERY_PRODUCTS,
        payload: products.data,
      });
    })
    .catch((error) => {
      console.log(error.message)
      dispatch({
        type: QUERY_ERROR,
        payload: true
      });
    });
};


/////////////////////////////////////////////////

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
        payload: false
    };
};