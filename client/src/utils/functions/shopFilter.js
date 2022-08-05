import orderProducts from "./order.js";

export default function shopFilter (array, filter, order){
    let response;

    if (filter === "ALLS") {
      response = array;
    } else if (filter === "RESTAURANT" || filter === "NO PERECEDERO") {
      response = array.filter((p) => p.type.includes(filter.toLowerCase()));
    }
  
    if (order === "") {
      return response;
    } else {
      response = orderProducts(response, order);
      return response;
    }
}