import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET_KEY: string | undefined = process.env.SECRET_KEY;

export function generateToken(payload: object): string {

    if (!SECRET_KEY) {
        throw new Error("JWT_SECRET non présente dans les variables d'environnement")
    }

    return jwt.sign(payload, SECRET_KEY, { expiresIn: '10000h' })
}

export function verifyToken(token: string): string | JwtPayload | null {
    if (!SECRET_KEY) {
        throw new Error("JWT_SECRET non présente dans les variables d'environnement")
    }
    try {
        return jwt.verify(token, SECRET_KEY)
    } catch (err: any) {
        return null;
    }
}

export function getClientIdFromPayload(payloadJson: string): string | null {
    const payload = JSON.parse(payloadJson) || null;
    return payload.id || null
}