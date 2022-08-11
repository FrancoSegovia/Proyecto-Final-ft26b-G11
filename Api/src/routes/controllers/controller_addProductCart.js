const Cart = require("../../schema/Cart");
const Product = require("../../schema/owner");
const mongoose = require("mongoose");

function getModelByName(name) {
    return mongoose.model(name);
  }

const addProductCart = (req, res) => {
    const { name, image, price } = req.body;

    const product = getModelByName("product")

    // Nos fijamos si tenemos el producto
    const productExist = product.findOne({ name })

    // Nos fijamos si todos los campos vienen con info
    const isNotEmptyCart = name !== "" && image !== "" && price !== "";

    // Nos fijamos si el producto esta en el carrito
    const inCart = Cart.findOne({name});

    // Si no tenemos el producto
    if(!productExist){
        res.status(400).json({
            message: "This product is not in our database "
        })

    // Si nos envian algo y NO esta en el carrito lo agregamos    
    } else if (isNotEmptyCart && !inCart){
        const newProductInCart = new Cart({ name, image, price, amount: 1});

    // Actualizamos la prop inCart
        product.findByIdAndUpdate(
            productExist?._id,
            { inCart: true, name, image, price},
            { new: true}
        )
        .then((product) => {
            newProductInCart.save();
            res.json({
                message: "Product added successfully"
            });
        })
        .catch((error) => console.log(error));
    }else if(inCart) {
        res.status(400).json({
            message: "The product is in Cart"
        })
    }
}

module.exports = addProductCart