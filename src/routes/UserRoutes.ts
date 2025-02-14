import { Router } from "express";
import { login, register } from "../controllers/UserController";



const router = Router();

 /**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Create a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's name
 *                 example: 'john_doe'
 *               password:
 *                 type: string
 *                 description: User's password
 *                 example: 'password123'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Utilisateur créé avec succès'
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request (missing name or password)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Le champs name et password sont incomplets.'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Erreur interne'
 *                 error:
 *                   type: string
 *                   example: 'Internal error message'
 *       11000:
 *         description: Email already used
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Cet Email est déjà utilisé'
 *     security:
 *       - bearToken: []
 * 
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: 'john_doe'
 *         hashedPassword:
 *           type: string
 *           example: 'hashed_password'
 *         role:
 *           type: string
 *           example: 'Employé'
 */

   router.post('/register', register);

   /**
 /**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Connexion d'un utilisateur
 *     description: Permet de connecter un utilisateur avec son nom d'utilisateur et son mot de passe.
 *     tags:
 *       - Authentification
 *     requestBody:
 *       description: Les informations de connexion de l'utilisateur
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Astérix"
 *                 description: "Le nom d'utilisateur de l'utilisateur"
 *               password:
 *                 type: string
 *                 example: "pwd"
 *                 description: "Le mot de passe de l'utilisateur"
 *     responses:
 *       200:
 *         description: Connexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Connexion réussie"
 *       401:
 *         description: Mot de passe incorrect
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Mot de passe incorrect"
 *       404:
 *         description: Utilisateur non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Utilisateur non trouvé"
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur serveur"
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: "Nom d'utilisateur de l'utilisateur"
 *         password:
 *           type: string
 *           description: "Mot de passe de l'utilisateur"
 *     LoginResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: "Message de réponse"
 *           example: "Connexion réussie"
 */
router.post('/login', login);
   
export default router;