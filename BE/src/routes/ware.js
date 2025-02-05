import { Router } from "express";
import { createWareHouse, getAllWareHouse, getOneWareHouse, removeWareHouse, updateWareHouse } from "../controllers/ware";
import { checkBodyRequestWareHouse } from "../middlewares/checkBodyRequest";

const wareRouter = Router();
wareRouter.post('/', checkBodyRequestWareHouse, createWareHouse),
wareRouter.get('/', getAllWareHouse),
wareRouter.get('/:id', getOneWareHouse),
wareRouter.put('/:id', checkBodyRequestWareHouse, updateWareHouse),
wareRouter.delete('/:id', removeWareHouse, checkBodyRequestWareHouse)

export default wareRouter