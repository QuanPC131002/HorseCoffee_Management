import { Router } from "express";
import { addToCart, decreaseItemQuantity, getCartByUserId, increaseItemQuantity, removeItemCart, updateProductQuantity } from "../controllers/cart";

const cartRouter = Router();
cartRouter.post('/add-to-cart', addToCart),
cartRouter.post('/remove', removeItemCart)
cartRouter.post('/increase', increaseItemQuantity)
cartRouter.post('/decrease', decreaseItemQuantity)
cartRouter.post('/update', updateProductQuantity)
cartRouter.get('/:userId', getCartByUserId)

export default cartRouter;