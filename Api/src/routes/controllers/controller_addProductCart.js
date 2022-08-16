const Cart = require("../../schema/Cart");
const Product = require("../../schema/Product");
const User = require("../../schema/User")
const mongoose = require("mongoose");

function getModelByName(name) {
    return mongoose.model(name);
  }

const addProductCart = async (req, res) => {
    
    const { user } = req.params
    const { _id } = req.body;
    console.log("soy body", req.body)
   
    const userId = await User.findOne(user)
    const usersId = userId._id
        

    const product = getModelByName("Product")
    
    // Nos fijamos si tenemos el producto

    const productExist = await product.findOne({ _id })

    // Nos fijamos si todos los campos vienen con info

    const isNotEmptyCart = _id !== ""  ;

    // Nos fijamos si el producto esta en el carrito

    const inCart = await Cart.findOne({_id});
    
    // Si no tenemos el producto 

    if(!productExist){
        res.status(400).json({
            message: "This product is not in our database " 
        })

    // Si nos envian algo y NO esta en el carrito lo agregamos    
    } else if (isNotEmptyCart && !inCart){
        const newProductInCart = new Cart({ name, image, price, amount: 1, user: usersId});

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