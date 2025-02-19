import bcryptjs from 'bcryptjs'


const saltRounds = 10;

export async function hashPassword(password: string): Promise<string> {
    return bcryptjs.hash(password, saltRounds);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcryptjs.compare(password, hash)
}