import { Router } from "express";
import categoryRouter from "./category";
import productRouter from "./product";
import wareRouter from "./ware";
import authRouter from "./auth";

const router = Router();

router.use("/category", categoryRouter)
router.use("/product", productRouter )
router.use("/ware", wareRouter )
router.use("/auth", authRouter)
export default router;