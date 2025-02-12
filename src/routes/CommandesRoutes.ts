import { Router } from "express";
import { createCommande, getClientsCommande, modifyStatus } from "../controllers/CommandesController";
import { verifyTokenMiddleware } from "../middlewares/verifyTokenMiddleware";

const router = Router();

router.post('/create',verifyTokenMiddleware, createCommande);
router.put('/modify/:id', verifyTokenMiddleware, modifyStatus )
router.get('/getcommandeclient', verifyTokenMiddleware, getClientsCommande)
router.put('/modifystatus/:id', verifyTokenMiddleware, modifyStatus)
   
export default router;