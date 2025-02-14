import { Router } from "express";
import { createProduit, getProduit, modifyProduit, deleteProduits } from "../controllers/ProduitsController";
import { verifyTokenMiddleware } from "../middlewares/verifyTokenMiddleware";



   const router = Router();

 /**
 * @swagger
 * /produits/create:
 *   post:
 *     summary: Créer un nouveau produit
 *     description: Permet de créer un produit en ajoutant son nom, sa description et son stock.
 *     tags:
 *       - Produits
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       description: Les informations du produit à créer
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nom
 *               - description
 *               - stock
 *             properties:
 *               nom:
 *                 type: string
 *                 example: "Produit A"
 *                 description: "Le nom du produit"
 *               description:
 *                 type: string
 *                 example: "C'est un produit exemple"
 *                 description: "La description du produit"
 *               stock:
 *                 type: integer
 *                 example: 50
 *                 description: "Le stock disponible du produit"
 *     responses:
 *       201:
 *         description: Produit créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Produit créé avec succès"
 *                 newProduit:
 *                   $ref: '#/components/schemas/Produit'
 *       403:
 *         description: Mauvaise requête (champs manquants ou stock invalide)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tous les champs doivent être complets"
 *       400:
 *         description: Le stock doit être supérieur ou égal à 0
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Le stock doit être au dessus de 0"
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
 *     Produit:
 *       type: object
 *       properties:
 *         nom:
 *           type: string
 *           description: "Nom du produit"
 *         description:
 *           type: string
 *           description: "Description du produit"
 *         stock:
 *           type: integer
 *           description: "Stock du produit"
 */
   router.post('/create',verifyTokenMiddleware, createProduit);

   /**
 * @swagger
 * /produits/get:
 *   get:
 *     summary: Get all products
 *     tags: [Produits]
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Liste des produits: '
 *                 produits:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Produit'
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
 *     security:
 *       - bearToken: []
 * 
 * components:
 *   schemas:
 *     Produit:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: '607d1b1f1f1f1f1f1f1f1f1f'
 *         nom:
 *           type: string
 *           example: 'Produit A'
 *         description:
 *           type: string
 *           example: 'Description du produit A'
 *         stock:
 *           type: integer
 *           example: 100
 *         createdAt:
 *           type: string
 *           example: '2025-02-12T12:00:00Z'
 *         updatedAt:
 *           type: string
 *           example: '2025-02-12T12:00:00Z'
 */

// Modify Produit route
/**
 * @swagger
 * /produits/modify/{id}:
 *   put:
 *     summary: Modify an existing product
 *     tags: [Produits]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The product ID to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 description: The name of the product
 *                 example: 'Produit A'
 *               description:
 *                 type: string
 *                 description: A description of the product
 *                 example: 'Updated description of Produit A'
 *               stock:
 *                 type: integer
 *                 description: The stock quantity of the product
 *                 example: 150
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Produit mis à jour avec succès'
 *                 updatedUser:
 *                   $ref: '#/components/schemas/Produit'
 *       400:
 *         description: Bad request (missing fields)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Les champs doivent être modifiés'
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Produit non trouvé'
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
 *     security:
 *       - bearToken: []
 */
   router.get('/get', verifyTokenMiddleware, getProduit)

   /**
 * @swagger
 * /produits/put/{id}:
 *   put:
 *     summary: Modify an existing product
 *     tags: [Produits]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The product ID to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 description: The name of the product
 *                 example: 'Produit A'
 *               description:
 *                 type: string
 *                 description: A description of the product
 *                 example: 'Updated description of Produit A'
 *               stock:
 *                 type: integer
 *                 description: The stock quantity of the product
 *                 example: 150
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Produit mis à jour avec succès'
 *                 updatedUser:
 *                   $ref: '#/components/schemas/Produit'
 *       400:
 *         description: Bad request (missing fields)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Les champs doivent être modifiés'
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Produit non trouvé'
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
 *     security:
 *       - bearToken: []
 * 
 * components:
 *   schemas:
 *     Produit:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: '607d1b1f1f1f1f1f1f1f1f1f'
 *         nom:
 *           type: string
 *           example: 'Produit A'
 *         description:
 *           type: string
 *           example: 'Description du produit A'
 *         stock:
 *           type: integer
 *           example: 100
 *         createdAt:
 *           type: string
 *           example: '2025-02-12T12:00:00Z'
 *         updatedAt:
 *           type: string
 *           example: '2025-02-12T12:00:00Z'
 */
   router.put('/put/:id', verifyTokenMiddleware, modifyProduit)

   /**
 * @swagger
 * /produits/delete/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Produits]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The product ID to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Produit effacé avec succès'
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Produit non trouvé'
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
 *     security:
 *       - bearToken: []
 * 
 * components:
 *   schemas:
 *     Produit:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: '607d1b1f1f1f1f1f1f1f1f1f'
 *         nom:
 *           type: string
 *           example: 'Produit A'
 *         description:
 *           type: string
 *           example: 'Description du produit A'
 *         stock:
 *           type: integer
 *           example: 100
 *         createdAt:
 *           type: string
 *           example: '2025-02-12T12:00:00Z'
 *         updatedAt:
 *           type: string
 *           example: '2025-02-12T12:00:00Z'
 */

   router.delete('/delete/:id', verifyTokenMiddleware, deleteProduits)

   
export default router;