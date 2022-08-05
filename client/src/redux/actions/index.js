import axios from "axios";

export const ALL_PRODUCTS = "ALL_PRODUCTS";
/////////////////////////////////////////////////
export const ORDER_PRODUCTS = "ORDER_PRODUCTS";
export const FILTER_PRODUCTS = "FILTER_PRODUCTS";
/////////////////////////////////////////////////

export const getAllProducts = () => (dispatch) => {
  return axios
    .get("localhost:3001/mockup")
    .then((products) => {
      dispatch({
        type: ALL_PRODUCTS,
        payload: products.data,
      });
    })
    .catch((error) => {
      console.error(error.message);
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
