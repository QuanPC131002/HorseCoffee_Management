import { Router } from "express";
import { createCategory, getAllCategory, getOneCategory, getOneCategoryByName, getOneCategoryBySlug, removeCategory, updateCategory } from "../controllers/category";

const categoryRouter = Router();
categoryRouter.post('/', createCategory)
categoryRouter.get('/', getAllCategory)
categoryRouter.get('/:id', getOneCategory)
categoryRouter.get('/slug/:slug', getOneCategoryBySlug)
categoryRouter.get('/name/:name', getOneCategoryByName)
categoryRouter.put('/:id', updateCategory)
categoryRouter.delete('/:id', removeCategory)
export default categoryRouter