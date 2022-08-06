
const myFoods = require("../schema/Foods.json");

module.exports = {

getProduct: function (name) {
    try {
        if(name){
            const foodByName = myFoods.filter((f) => f.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()));
            if(foodByName.length){
                return foodByName
            }
            return"No se encontro el producto"
        }else{
            return myFoods
        }
    } catch (error) {
        console.log(error)
    }

},

getProductById: function (id) {
    try {
        const foodById = myFoods.find(obj => obj.id.toString() === id)
        return foodById
       } catch (error) {
           console.log(error)
       }
}



}