import { Router } from "express";
import categoryRouter from "./category";

const router = Router();

router.use("/category", categoryRouter)
export default router;