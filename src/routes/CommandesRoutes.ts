import { Router } from "express";
import { createCommande, getUserCommande } from "../controllers/CommandesController";
import { verifyTokenMiddleware } from "../middlewares/verifyTokenMiddleware";



   const router = Router();

   router.post('/create',verifyTokenMiddleware, createCommande);
   
export default router;