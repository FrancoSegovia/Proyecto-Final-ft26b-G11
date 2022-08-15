const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../routes/middlewares");
const ownerController = require("../routes/controllers/controller_owners");
const userController = require("../routes/controllers/controller_users")

router.post("/signup", ownerController.signup); //*REGISTRO
router.get("/confirm/:token", ownerController.confirmAccount); //*EMAIL Y VERIFICACION

router.get("/currentOwner", isAuthenticated, ownerController.currentOwner); //*DETAIL OWNER
router.put("/currentOwner/update/:id",isAuthenticated,ownerController.updateCurrentOwner); //* UPDATE OWNER

router.get("/local/:id", isAuthenticated, ownerController.getLocal);//* GET LOCALS SEPARADOS POR OWNER
router.post("/local/add_local", isAuthenticated, ownerController.addLocal); //*ADD LOCALS
router.put("/local/update/:id",isAuthenticated,ownerController.updateLocal); //*UPDATE LOCAL
router.delete('/local/:id', isAuthenticated, ownerController.deleteLocal) //*DELETE LOCAL
router.get("/local/detail/:id", isAuthenticated, ownerController.getLocalById); //*DETAIL LOCAL

router.get("/products/:id", isAuthenticated, ownerController.getProduct);//* GET PRODUCT SEPARADOS POR LOCAL
router.post("/local/add_product",isAuthenticated,ownerController.addProduct); //*ADD PRODUCTS
router.put("/local/product/update/:id",isAuthenticated,ownerController.updateProduct); //*UPDATE PRODUCT
router.delete('/local/product/:id', isAuthenticated, ownerController.deleteProduct) //*DELETE PRODUCT

module.exports = router;
