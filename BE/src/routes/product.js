import { Router } from "express";
import { createProduct, getAllProducts, getOneProduct, related, removeProduct, updateProduct } from "../controllers/product";
import { checkBodyRequestProduct } from "../middlewares/checkBodyRequest";
import { checkIsAdmin } from "../middlewares/checkAdmin";

const productRouter = Router()
productRouter.post('/', checkIsAdmin, checkBodyRequestProduct, createProduct)
productRouter.get('/', getAllProducts)
productRouter.get('/:id', getOneProduct)
productRouter.put('/:id', checkIsAdmin, checkBodyRequestProduct, updateProduct, )
productRouter.delete('/:id',checkIsAdmin, removeProduct)
productRouter.get("/:categoryId/related", related);


export default productRouter