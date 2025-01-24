import { Router } from "express";
import { createWareHouse, getAllWareHouse, getOneWareHouse, removeWareHouse, updateWareHouse } from "../controllers/ware";
import { checkIsAdmin } from "../middlewares/checkAdmin";
import { checkBodyRequestWareHouse } from "../middlewares/checkBodyRequest";

const wareRouter = Router();
wareRouter.post('/', checkIsAdmin, checkBodyRequestWareHouse, createWareHouse),
wareRouter.get('/', getAllWareHouse),
wareRouter.get('/:id', getOneWareHouse),
wareRouter.put('/:id', checkIsAdmin, checkBodyRequestWareHouse, updateWareHouse),
wareRouter.delete('/:id', checkIsAdmin, removeWareHouse, checkBodyRequestWareHouse)

export default wareRouter