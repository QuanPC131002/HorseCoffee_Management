import { Router } from "express";
import categoryRouter from "./category";
import productRouter from "./product";

const router = Router();

router.use("/category", categoryRouter)
router.use("/product", productRouter )
export default router;