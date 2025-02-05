import express from "express";
import { login, register } from "../controllers/authController";
import { verifyTokenMiddleware } from "../middlewares/verifyTokenMiddleware";

const router = express.Router();


router.post('/login', verifyTokenMiddleware, login);
router.post('/register', register);

export default router;