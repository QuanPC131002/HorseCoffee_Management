import { Router } from "express";
import { createProduct, getAllProducts, getOneProduct, related, removeProduct, updateProduct } from "../controllers/product.js";
import { checkBodyRequestProduct } from "../middlewares/checkBodyRequest.js";

const productRouter = Router()
productRouter.post('/', checkBodyRequestProduct, createProduct)
productRouter.get('/', getAllProducts)
productRouter.get('/:id', getOneProduct)
productRouter.put('/:id', checkBodyRequestProduct, updateProduct, )
productRouter.delete('/:id', removeProduct)
productRouter.get("/:categoryId/related", related);


export default productRouter