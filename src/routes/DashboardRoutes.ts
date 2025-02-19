import { Router } from "express";
import { getRevenue, getStock } from "../controllers/DashboardController";
import { verifyTokenMiddleware } from "../middlewares/verifyTokenMiddleware";

const router = Router();

router.get('/getRevenu',verifyTokenMiddleware, getRevenue);
router.get('/getStock', verifyTokenMiddleware, getStock)

export default router;