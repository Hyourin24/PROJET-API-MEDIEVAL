import { NextFunction } from "express";
import {Request, Response} from "express";
import {verifyToken} from "../utils/JWTUtils"

export function isAdmin(req:Request, res:Response,next: NextFunction){
    //Les cookies sont récupérés dans le header
    const cookie = req.headers.cookie;
    //Gestion d'erreur
    if (!cookie) {
        res.status(401).json({ message: 'Cookie manquant' });
        return;
    }
    // Récupération du token dans le cookie après "="
    const token = cookie.split('=')[1];
    console.log(token);

    //Gestion d'erreur
    if(!token) {
        res.status(401).json({message: 'Non autorisé, token manquant, veuillez vous connecter'});
        return;
    }
    //Vérificatin du token
    const decoded = verifyToken(token);
    //Gestion d'erreur
    if(!decoded || typeof decoded === 'string' || decoded.role !== 'Admin') {
        res.status(403).json({message: 'Accès interdit, vous devez être admin pour accéder à cette ressource'});
        return;
    }

    next();
}