import { Router } from "express";
import categoryRouter from "./category.js";
import productRouter from "./product.js";
import wareRouter from "./ware.js";
import authRouter from "./auth.js";
import cartRouter from "./cart.js";
import orderRouter from "./order.js";

const router = Router();

router.use("/categories", categoryRouter)
router.use("/product", productRouter )
router.use("/ware", wareRouter )
router.use("/auth", authRouter)
router.use("/cart", cartRouter)
router.use("/order", orderRouter)
export default router;