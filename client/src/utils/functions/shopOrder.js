export default function shopOrder(array, order) {
    if(order === "AZ" || order === "ZA") {
        let response = array.sort((a, b) => {
            if (a.name < b.name) {
              return order === "ZA" ? 1 : -1;
            }
            if (a.name > b.name) {
              return order === "AZ" ? 1 : -1;
            }
            return 0;
          });
          return response;
    }
}