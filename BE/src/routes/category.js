import { Router } from "express";
import { createCategory, getAllCategory, getOneCategory, getOneCategoryByName, getOneCategoryBySlug, removeCategory, updateCategory } from "../controllers/category";
import { checkBodyRequestCategory } from "../middlewares/checkBodyRequest";

const categoryRouter = Router();
categoryRouter.post('/', createCategory, checkBodyRequestCategory)
categoryRouter.get('/', getAllCategory)
categoryRouter.get('/:id', getOneCategory)
categoryRouter.get('/slug/:slug', getOneCategoryBySlug)
categoryRouter.get('/name/:name', getOneCategoryByName)
categoryRouter.put('/:id', updateCategory, checkBodyRequestCategory)
categoryRouter.delete('/:id', removeCategory)
export default categoryRouter