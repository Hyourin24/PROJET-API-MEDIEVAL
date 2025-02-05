import { NextFunction } from "express";
import {Request, Response} from "express";
import {verifyToken} from "../utils/JWTUtils"

export function isAdmin(req:Request, res:Response,next: NextFunction){
    const cookie = req.headers.cookie;

    if (!cookie) {
        res.status(401).json({ message: 'Cookie manquant' });
        return;
    }
    const token = cookie.split('=')[1];
    console.log(token);
    if(!token) {
        res.status(401).json({message: 'Non autorisé, token manquant, veuillez vous connecter'});
        return;
    }

    const decoded = verifyToken(token);
 
    if(!decoded || typeof decoded === 'string' || decoded.role !== 'Admin') {
        res.status(403).json({message: 'Accès interdit, vous devez être admin pour accéder à cette ressource'});
        return;
    }

    next();
}