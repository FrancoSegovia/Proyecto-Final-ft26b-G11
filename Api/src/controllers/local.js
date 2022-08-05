
const myLocal = require("../schema/Locals.json");

module.exports = {

getLocal: function (name) {
    try {
        if(name){
            const localByName = myLocal.filter((l) => l.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()));
            if(localByName.length){
                return localByName
            }
            return "No se encontro el producto"
        }else{
            return myLocal
        }
    } catch (error) {
        console.log(error)
    }
},

getLocalById: function (id) {
    try {
        const localById = myLocal.find(obj => obj.id.toString() === id)
        return localById
       } catch (error) {
           console.log(error)
       }
}

}