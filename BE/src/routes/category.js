import { Router } from "express";
import { createCategory, getAllCategory, getOneCategory, getOneCategoryByName, getOneCategoryBySlug, removeCategory, updateCategory } from "../controllers/category";
import { checkBodyRequestCategory } from "../middlewares/checkBodyRequest";
import { checkIsAdmin } from "../middlewares/checkAdmin";

const categoryRouter = Router();
categoryRouter.post('/', checkIsAdmin, checkBodyRequestCategory, createCategory)
categoryRouter.get('/', getAllCategory)
categoryRouter.get('/:id', getOneCategory)
categoryRouter.get('/slug/:slug', getOneCategoryBySlug)
categoryRouter.get('/name/:name', getOneCategoryByName)
categoryRouter.put('/:id', checkIsAdmin, checkBodyRequestCategory, updateCategory)
categoryRouter.delete('/:id', checkIsAdmin, removeCategory)
export default categoryRouter