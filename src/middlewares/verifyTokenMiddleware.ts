import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/JWTUtils';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

export function verifyTokenMiddleware(req: Request, res: Response, next: NextFunction): void {
    if (SECRET_KEY === undefined) {
        throw new Error("SECRET_KEY non présente dans les variables d'environnement")
    }
    const cookie = req.headers.cookie;
    if (!cookie) {
        res.status(401).json({ message: "Access denied. Cookie missing" });
        return;
    }
    const token = cookie.split('=')[1];
    console.log(token);

    if (!token) {
        res.status(401).json({ message: 'Access Denied. Token Missing.' })
        return;
    }
    try {
        const decoded = verifyToken(token);
        req.headers.payload = JSON.stringify(decoded);

        if (!decoded) {
            res.status(403).send({ message: 'Token invalide ou expiré' })
            return
        }
        next();
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }

     next();
}