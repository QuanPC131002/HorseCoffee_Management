import { Router } from "express";
import categoryRouter from "./category";
import productRouter from "./product";
import wareRouter from "./ware";
import authRouter from "./auth";
import cartRouter from "./cart";
import orderRouter from "./order";

const router = Router();

router.use("/categories", categoryRouter)
router.use("/product", productRouter )
router.use("/ware", wareRouter )
router.use("/auth", authRouter)
router.use("/cart", cartRouter)
router.use("/order", orderRouter)
export default router;