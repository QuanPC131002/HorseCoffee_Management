import { Router } from "express";
import { addToCart, clearCart, decreaseItemQuantity, getCartByUserId, increaseItemQuantity, removeItemCart, updateProductQuantity } from "../controllers/cart.js";
import { checkIsAdmin } from "../middlewares/checkAdmin.js";

const cartRouter = Router();
cartRouter.post('/add-to-cart', addToCart),
cartRouter.post('/remove', removeItemCart)
cartRouter.post('/increase', increaseItemQuantity)
cartRouter.post('/decrease', decreaseItemQuantity)
cartRouter.post('/update', updateProductQuantity)
cartRouter.post('/clear', clearCart)
cartRouter.get('/:userId', getCartByUserId)

export default cartRouter;