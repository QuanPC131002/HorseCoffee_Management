import { Router } from "express";
import { createOrder, getOrder, getOrderById, updateOrderStatus } from "../controllers/order";

const orderRouter = Router();
orderRouter.post('/', createOrder)
orderRouter.get('/', getOrder)
orderRouter.get('/:userId/:orderId', getOrderById)

export default orderRouter