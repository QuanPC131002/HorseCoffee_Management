import { Router } from "express";
import { createOrder, getOrder, getOrderById, updateOrderStatus } from "../controllers/order.js";

const orderRouter = Router();
orderRouter.post('/', createOrder)
orderRouter.get('/', getOrder)
orderRouter.get('/:userId/:orderId', getOrderById)
orderRouter.put('/:orderId', updateOrderStatus)

export default orderRouter