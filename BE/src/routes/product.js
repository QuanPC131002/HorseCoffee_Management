import { Router } from "express";
import { createProduct, getAllProducts, getOneProduct, removeProduct, updateProduct } from "../controllers/product";

const productRouter = Router()
productRouter.post('/', createProduct)
productRouter.get('/', getAllProducts)
productRouter.get('/:id', getOneProduct)
productRouter.put('/:id', updateProduct)
productRouter.delete('/:id', removeProduct)

export default productRouter