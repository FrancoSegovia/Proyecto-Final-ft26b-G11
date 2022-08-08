import shopOrder from "./shopOrder";

export default function shopFilter(array, filter, order) {
  let response;

  if (filter === "DEFAULT" && !order.length) {
    return array;
  } else if (filter === "DEFAULT" && order.length) {
    response = shopOrder(array, order);
    return response;
  } else if (filter !== "DEFAULT" && !order.length) {
    response = array.filter(
      (s) => s.category.toUpperCase() === filter.toUpperCase()
    );
    return response
  } else {
    response = array.filter(
      (s) => s.category.toUpperCase() === filter.toUpperCase()
    );
    response = shopOrder(response, order);
    return response;
  }
}
