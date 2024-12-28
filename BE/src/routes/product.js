import { Router } from "express";
import { createProduct, getAllProducts, getOneProduct, removeProduct, updateProduct } from "../controllers/product";
import { checkBodyRequestProduct } from "../middlewares/checkBodyRequest";

const productRouter = Router()
productRouter.post('/', createProduct, checkBodyRequestProduct)
productRouter.get('/', getAllProducts)
productRouter.get('/:id', getOneProduct)
productRouter.put('/:id', updateProduct, checkBodyRequestProduct)
productRouter.delete('/:id', removeProduct)

export default productRouter