const Cart = require("../../schema/Cart");

const putProduct = (req, res) => {
    const { productId } = req.params;
    const { query } = req.query;
    const body = req.body;

    // Buscamos el producto en el carrito
    const searchProduct = Cart.findById(productId);

    // Si no hay query "add" o "del"
    if(!query) {
        res.status(400).json({ message: "Please, send query"});
        
    // Si esta el producto en el carrito y lo queremos agregar
    } else if(searchProduct && query === "add") {
        body.amount = body.amount + 1;

        Cart.findByIdAndUpdate(productId, body, {
            new: true,
        }).then((product) => {
            res.json({
                message: `The product: ${product.name} was update`
            });
        });

    // Si el producto esta en el carrito y lo quiero sacar
    } else if(searchProduct && query === "del") {
        body.amount = body.amount - 1;

        Cart.findByIdAndUpdate(productId, body, {
            new: true,
        }).then((product) => {
            res.json({
                message: `The product: ${product.name} was update`
            });
        });

    } else {
        res.status(400).json({ message: "Error"})
    }

}

module.exports = putProduct;
