import productOrder from "./order.js";

export default function productFilter(array, filter, order) {
  let response;

  if (filter === "ALLP") {
    response = array;
  } else if (filter === "COMIDA" || filter === "BEBIDA") {
    response = array.filter((p) => p.type.includes(filter.toLowerCase()));
  }

  if (order === "") {
    return response;
  } else {
    response = productOrder(response, order);
    return response;
  }
}
