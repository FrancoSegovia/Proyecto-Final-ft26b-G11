export default function productsOrder(array, distribution, filter) {
    if(distribution === "MAX" || distribution === "MIN") {
        let response = array.sort((a, b) => {
            if (a.price < b.price) {
              return distribution === "MAX" ? 1 : -1;
            }
            if (a.price > b.price) {
              return distribution === "MIN" ? 1 : -1;
            }
            return 0;
          });
          return response;
    }
}