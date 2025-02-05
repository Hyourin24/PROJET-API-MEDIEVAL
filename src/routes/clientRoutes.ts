import express from "express";
import { createClient, modifyClient, modifyClientActif } from "../controllers/clientController";
import { verifyTokenMiddleware } from "../verifyTokenMiddleware";

const router = express.Router();


router.post('/create', createClient);
router.put('/modify/clients/:id', verifyTokenMiddleware, modifyClient);
router.put('/modify/actif/:id', verifyTokenMiddleware, modifyClientActif);


export default router;