import { Router } from "express";
import { createWareHouse, getAllWareHouse, getOneWareHouse, removeWareHouse, updateWareHouse } from "../controllers/ware";

const wareRouter = Router();
wareRouter.post('/', createWareHouse),
wareRouter.get('/', getAllWareHouse),
wareRouter.get('/:id', getOneWareHouse),
wareRouter.put('/:id', updateWareHouse),
wareRouter.delete('/:id', removeWareHouse)

export default wareRouter