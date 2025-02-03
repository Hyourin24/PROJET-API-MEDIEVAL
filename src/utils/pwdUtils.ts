import bcryptjs from 'bcryptjs'

// Définition du nombre de "rounds" pour le salage des mots de passe.
// Plus le nombre est élevé, plus le hachage sera sécurisé, mais il sera aussi plus lent.
const saltRounds = 10;


/**
 * Fonction pour hacher un mot de passe.
 * 
 * @param password - Le mot de passe brut à hacher.
 * @returns Une promesse qui résout une chaîne de caractères représentant le mot de passe haché.
 */
export async function hashPassword(password: string): Promise<string> {
    //Utilise bcrypt pour générer un hachage sécurisé du mot de passe.
    return bcryptjs.hash(password, saltRounds);
}

/**
 * Fonction pour vérifier si un mot de passe correspond à un hachage donné.
 * 
 * @param password - Le mot de passe brut à vérifier.
 * @param hash - Le hachage avec lequel comparer le mot de passe.
 * @returns Une promesse qui résout un booléen indiquant si le mot de passe correspond au hachage.
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
    //Compare le mot de passe brut avec le hachage en utilisant bcrypt.
    //Retourne true si les deux correspondent, sinon false.
    return bcryptjs.compare(password, hash);
}