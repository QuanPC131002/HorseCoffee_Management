import { Router } from "express";
import { createWareHouse, getAllWareHouse, getOneWareHouse, removeWareHouse, updateWareHouse } from "../controllers/ware.js";
import { checkBodyRequestWareHouse } from "../middlewares/checkBodyRequest.js";

const wareRouter = Router();
wareRouter.post('/', checkBodyRequestWareHouse, createWareHouse),
wareRouter.get('/', getAllWareHouse),
wareRouter.get('/:id', getOneWareHouse),
wareRouter.put('/:id', checkBodyRequestWareHouse, updateWareHouse),
wareRouter.delete('/:id', removeWareHouse, checkBodyRequestWareHouse)

export default wareRouter