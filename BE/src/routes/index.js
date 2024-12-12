import { Router } from "express";
import categoryRouter from "./category";
import productRouter from "./product";
import wareRouter from "./ware";

const router = Router();

router.use("/category", categoryRouter)
router.use("/product", productRouter )
router.use("/ware", wareRouter )
export default router;