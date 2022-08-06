import axios from "axios";

export const ALL_LOCALS = "ALL_LOCALS";
export const QUERY_LOCALS = "QUERY_LOCALS";
/////////////////////////////////////////////////
export const ORDER_PRODUCTS = "ORDER_PRODUCTS";
export const FILTER_PRODUCTS = "FILTER_PRODUCTS";
/////////////////////////////////////////////////
export const QUERY_ERROR = "QUERY_ERROR";
export const ERROR_CLEANER = "ERROR_CLEANER";

export const getAllLocals = () => (dispatch) => {
  return axios
    .get("http://localhost:3001/locals")
    .then((products) => {
      dispatch({
        type: ALL_LOCALS,
        payload: products.data,
      });
    })
    .catch((error) => console.error(error.message));
};

export const getQueryLocals = (query) => (dispatch) => {
  return axios
    .get(`http://localhost:3001/locals?name=${query}`)
    .then((products) => {
      dispatch({
        type: QUERY_LOCALS,
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