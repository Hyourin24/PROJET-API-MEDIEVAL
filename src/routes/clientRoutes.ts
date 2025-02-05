import express from "express";
import { createClient } from "../controllers/clientController";

const router = express.Router();


router.post('/create', createClient);


export default router;