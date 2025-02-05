import express from "express";
import { createClient, modifyClient } from "../controllers/clientController";
import { verifyTokenMiddleware } from "../verifyTokenMiddleware";

const router = express.Router();


router.post('/create', createClient);
router.put('/modify/clients/:id', verifyTokenMiddleware, modifyClient);


export default router;