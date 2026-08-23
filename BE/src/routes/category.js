import { Router } from "express";
import { createCategory, getAllCategory, getOneCategory, getOneCategoryByName, getOneCategoryBySlug, removeCategory, updateCategory } from "../controllers/category.js";
import { checkBodyRequestCategory } from "../middlewares/checkBodyRequest.js";

const categoryRouter = Router();
categoryRouter.post('/', checkBodyRequestCategory, createCategory)
categoryRouter.get('/', getAllCategory)
categoryRouter.get('/:id', getOneCategory)
categoryRouter.get('/slug/:slug', getOneCategoryBySlug)
categoryRouter.get('/name/:name', getOneCategoryByName)
categoryRouter.put('/:id', checkBodyRequestCategory, updateCategory)
categoryRouter.delete('/:id', removeCategory)
export default categoryRouter