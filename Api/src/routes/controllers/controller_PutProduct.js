const Cart = require("../../schema/Carts");

const putProduct = async (req, res) => {
    const { productId } = req.params;
    const { query } = req.query;
    const body = req.body;

    const searchProduct = await Cart.findById(productId);

    if(!query) {
        res.status(400).json({ message: "Please, send query"});
        
    } else if(searchProduct && query === "add") {
        body.amount = body.amount + 1;

        await Cart.findByIdAndUpdate(productId, body, {
            new: true,
        }).then((product) => {
            res.json({
                message: `The product: ${product.name} was update`
            });
        });

    } else if(searchProduct && query === "del") {
        body.amount = body.amount - 1;

        await Cart.findByIdAndUpdate(productId, body, {
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