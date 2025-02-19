import { Router } from "express";
import { createCommande, getClientsCommande, modifyStatus, modifyCancelStatus } from "../controllers/CommandesController";
import { verifyTokenMiddleware } from "../middlewares/verifyTokenMiddleware";

const router = Router();

router.post('/create',verifyTokenMiddleware, createCommande);
router.put('/modify/:id', verifyTokenMiddleware, modifyStatus )
router.get('/getcommandeclient', verifyTokenMiddleware, getClientsCommande)
router.put('/modifystatus/:id', verifyTokenMiddleware, modifyStatus)
router.put('/modifycancelstatus/:id', verifyTokenMiddleware, modifyCancelStatus)

   
export default router;