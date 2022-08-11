const Cart = require("../../schema/Carts");
const Product = require("../../schema/Products");

const addProductCart = async (req, res) => {
    const { name, image, price } = req.body;

    const productExist = await Product.findOne({name});

    const isNotEmptyCart = name !== "" && image !== "" && price !== "";

    const inCart = await Cart.findOne({name});

    if(!productExist){
        res.status(400).json({
            message: "This product is not in our database "
        })
    } else if (isNotEmptyCart && !inCart){
        const newProductInCart = new Cart({ name, image, price, amount: 1});

        await Product.findByIdAndUpdate(
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