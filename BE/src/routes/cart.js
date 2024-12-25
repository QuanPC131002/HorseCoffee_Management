import { Router } from "express";
import { addToCart, decreaseItemQuantity, increaseItemQuantity, removeItemCart } from "../controllers/cart";

const cartRouter = Router();
cartRouter.post('/add-to-cart', addToCart),
cartRouter.post('/remove', removeItemCart)
cartRouter.post('/increase', increaseItemQuantity)
cartRouter.post('/decrease', decreaseItemQuantity)

export default cartRouter;