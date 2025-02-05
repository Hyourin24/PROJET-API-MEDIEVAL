import { Router } from "express";
import { createProduit, getProduit, modifyProduit, deleteProduits } from "../controllers/ProduitsController";
import { verifyTokenMiddleware } from "../middlewares/verifyTokenMiddleware";



   const router = Router();

   router.post('/create',verifyTokenMiddleware, createProduit);
   router.get('/get', verifyTokenMiddleware, getProduit)
   router.put('/put/:id', verifyTokenMiddleware, modifyProduit)
   router.delete('/delete/:id', verifyTokenMiddleware, deleteProduits)

   
export default router;