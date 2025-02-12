import express from "express";
import { createClient, getAllActiveClients, getAllClients, modifyClient, modifyClientActif,  } from "../controllers/ClientController";
import { verifyTokenMiddleware } from "../middlewares/verifyTokenMiddleware";
import { isAdmin } from "../middlewares/verifyRole";

const router = express.Router();


router.post('/create', createClient);
router.put('/modifyclients/:id', verifyTokenMiddleware, modifyClient);
router.put('/modifyactif/:id', isAdmin, verifyTokenMiddleware, modifyClientActif);
router.get('/getActiveclients', verifyTokenMiddleware, getAllActiveClients);
router.get('/getAll', verifyTokenMiddleware, getAllClients)
// router.get('/getcommandeclient/:clientId', verifyTokenMiddleware, getClientCommande)


export default router;