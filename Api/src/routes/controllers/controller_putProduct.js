const Cart = require("../../schema/Cart");

const putProduct = async (req, res) => {
    const { _id } = req.params;
    const { query } = req.query;
    const body = req.body;

    // Buscamos el producto en el carrito
    const searchProduct = await Cart.findById(_id);

    // Si no hay query "add" o "del"
    if(!query) {
        res.status(400).json({ message: "Please, send query"});
        
    // Si esta el producto en el carrito y lo queremos agregar
    } else if(searchProduct && query === "add") {

        
        body.amount = body.amount + 1 ;
        console.log(body.amount)        
        
       await Cart.findByIdAndUpdate(_id, body, {
            new: true,
        }).then((product) => {
            console.log("soy add", product)
            res.json({
                message: `The product: ${product.name} was update`
            });
        });

    // Si el producto esta en el carrito y lo quiero sacar
    } else if(searchProduct && query === "del") {
        body.amount = body.amount - 1;
        console.log(body.amount)
        await Cart.findByIdAndUpdate(_id, body, {
            new: true,
        }).then((product) => {
            console.log("soy del",product)
            res.json({
                message: `The product: ${product.name} was update`
            });
        });

    } else {
        res.status(400).json({ message: "Error lala"})
    }


}

module.exports = putProduct;
