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
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Authentifie un utilisateur et génère un token JWT
 *     description: >
 *       Permet à un utilisateur de se connecter en utilisant son nom et son mot de passe.
 *       Si les informations sont valides, un token JWT est généré et envoyé dans un cookie sécurisé.
 *     tags:
 *       - Authentification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Alice"
 *                 description: Le nom d'utilisateur.
 *               password:
 *                 type: string
 *                 example: "pwd"
 *                 description: Le mot de passe de l'utilisateur.
 *     responses:
 *       200:
 *         description: Connexion réussie, token JWT renvoyé dans les cookies.
 *         headers:
 *           Set-Cookie:
 *             description: Le cookie contenant le token JWT.
 *             schema:
 *               type: string
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful!"
 *       401:
 *         description: Identifiants invalides
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid credentials."
 *       404:
 *         description: Utilisateur introuvable
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found."
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error."
 */
router.post('/login', login);
   
export default router;