import { Router } from "express";
import { createProduit, getProduit, modifyProduit } from "../controllers/ProduitsController";
import { verifyTokenMiddleware } from "../middlewares/verifyTokenMiddleware";



   const router = Router();

   router.post('/create',verifyTokenMiddleware, createProduit);
   router.get('/get', verifyTokenMiddleware, getProduit)
   router.put('/put', verifyTokenMiddleware, modifyProduit)

   
export default router;