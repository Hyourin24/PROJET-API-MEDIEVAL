import { Request, Response } from "express";
import user, { UserI } from "../DBSchema/User"
import { hashPassword, verifyPassword } from "../utils/pwdUtils";
import { generateToken } from "../utils/JWTUtils";
import User from "../DBSchema/User";

export async function register(req: Request, res: Response) {
    try {
        const { name, password } = req.body;

        //Validation des champs
        if (!name || !password) {
            res.status(400).json({ message: 'champs obligatoires: name,password' })
            return
        }

        //hashage du password
        const hashedPassword = await hashPassword(password);

        //Création d'un nouvel utilisateur
        const newUser: UserI = new User({ name, hashedPassword, role: 'Employé'});

        //Sauvegarde dans la base de données
        const savedUser = await newUser.save();

        //On supprime le hashed password de la réponse envoyée au client
        savedUser.hashedPassword = '';

        //Réponse réussie
        res.status(201).json({ message: 'Utilisateur créé avec succès', data: savedUser })
    } catch (err: any) {
        //Erreur de duplication (utilisateur unique)
        if (err.code === 11000) {
            res.status(400).json({ message: 'Cet utilisateur est déjà utilisé' })
            return
        }
        res.status(500).json({ message: 'Erreur interne', error: err.message })

    }
}

export async function login(req: Request, res: Response) {
    const { name, password } = req.body;

    try {
        //Rechercher l'utilisateur dans la base de données par name
        const utilisateur = await user.findOne({ name });

        //Vérifie si l'urilisateur existe
        if (!utilisateur) {
            res.status(404).json({ message: 'User not found.' });
            return
        }

        //Vérifier si le mot de passe est correct
        const isPasswordValid = await verifyPassword(password, utilisateur.hashedPassword)
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Mot de passe invalide' })
            return
        }

        //Génèrer un token JWT
        const token = generateToken({ id: utilisateur._id });

        //Envoyer le token dans un cookier sécurisé,
        //le cookie n'est pas accesible par le client et ne peut être envoyé qu'à son émetteur
        res.cookie('jwt', token, { httpOnly: true, sameSite: 'strict' });
        res.status(200).json({ message: 'Login succesful!' })

    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}