const Cart = require("../../schema/Cart");
const Product = require("../../schema/Product");
const User = require("../../schema/User")
const mongoose = require("mongoose");

function getModelByName(name) {
    return mongoose.model(name);
  }

const addProductCart = async (req, res) => {
    
    const { } = req.params
    const { name, image, price, user} = req.body;
   
    

    const product = getModelByName("Product")
    
    // Nos fijamos si tenemos el producto

    const productExist = await product.findOne({ name })

    // Nos fijamos si todos los campos vienen con info

    const isNotEmptyCart = name !== "" && image !== "" && price !== "" ;

    // Nos fijamos si el producto esta en el carrito

    const inCart = await Cart.findOne({name});
    
    // Si no tenemos el producto 

    if(!productExist){
        res.status(400).json({
            message: "This product is not in our database "
        })

    // Si nos envian algo y NO esta en el carrito lo agregamos    
    } else if (isNotEmptyCart && !inCart){
        const newProductInCart = new Cart({ name, image, price, amount: 1, user});

    // Actualizamos la prop inCart
        product.findByIdAndUpdate(
            productExist?._id,
            { inCart: true, name, image, price},
            { new: true}
        )
        const newProduct = await newProductInCart.save();
        res.json(newProduct)
            
        
    }else  {
        res.status(400).json({
            message: "The product is in Cart"
        })
        
    }
}

module.exports = addProductCart