import { NextFunction } from "express";
import {Request, Response} from "express";
import {verifyToken} from "../utils/JWTUtils"

export function isAdmin(req:Request, res:Response,next: NextFunction){
    const token = req.cookies ? req.cookies.jwt : null;

    if(!token) {
        res.status(401).json({message: 'Non autorisé, veuillez vous connecter'});
        return;
    }

    const decoded = verifyToken(token);

    if(!decoded || typeof decoded === 'string' || decoded.role !== 'admin') {
        res.status(403).json({message: 'Accès interdit, viys devez être admin pour accéder à cette ressource'});
        return;
    }

    next();
}