import express from "express";
import { createClient, modifyClient, modifyClientActif } from "../controllers/clientController";
import { verifyTokenMiddleware } from "../middlewares/verifyTokenMiddleware";
import { isAdmin } from "../middlewares/verifyRole";

const router = express.Router();


router.post('/create', createClient);
router.put('/modify/clients/:id', verifyTokenMiddleware, modifyClient);
router.put('/modify/actif/:id',  verifyTokenMiddleware, isAdmin, modifyClientActif)


export default router;